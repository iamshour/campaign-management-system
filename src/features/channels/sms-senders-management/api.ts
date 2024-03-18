/* eslint-disable perfectionist/sort-objects*/

//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"
import type { ChannelSourceListingDetails } from "@/features/channels/common/types/data.types"
import type {
	ChannelSourceOptOut,
	ChannelSourceRequest,
	ChannelSourceRequestDetails,
	UserInCompany,
} from "@/features/channels/sms-senders-management/types/data.types"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import { downloadFile } from "@/utils"

import type {
	AddBulkChannelSourceRequestsBody,
	ExportChannelSourceOptOutListParams,
	GetChannelSourceOptOutListParams,
	GetChannelSourceRequestAndListingByIdReturnType,
	GetChannelSourceRequestsParams,
	ImportChannelSourceOptOutBody,
	OptInOptedOutChannelSourceListBody,
	UpdateChannelSourceListingStatusBody,
	UpdateChannelSourceRequestActionBody,
} from "./types/api.types"
//#endregion

// eslint-disable-next-line
const smsSendersManagementApis = api.injectEndpoints({
	endpoints: (builder) => ({
		getChannelSourceRequests: builder.query<GetListReturnType<ChannelSourceRequest>, GetChannelSourceRequestsParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ channelSourceRequestId }) => channelSourceRequestId),
					"ChannelSourceRequest"
				),
			query: (params) => ({ params, url: "/channel-source/request" }),
			transformResponse,
		}),

		getChannelSourceRequestAndListingById: builder.query<
			GetChannelSourceRequestAndListingByIdReturnType,
			Record<"channelSourceListingId" | "channelSourceRequestId", string>
		>({
			async queryFn({ channelSourceListingId, channelSourceRequestId }, _queryApi, _extraOptions, fetchWithBQ) {
				const channelSourceRequestDetails = await fetchWithBQ(`/channel-source/request/${channelSourceRequestId}`)

				const channelSourceListingDetails = await fetchWithBQ(`/channel-source/listing/${channelSourceListingId}`)

				if (channelSourceRequestDetails.error || channelSourceListingDetails.error)
					return {
						error: (channelSourceRequestDetails.error || channelSourceListingDetails.error) as FetchBaseQueryError,
					}

				const requestDetails = (channelSourceRequestDetails.data as { data: ChannelSourceRequestDetails })?.data

				const listingDetails = (channelSourceListingDetails.data as { data: ChannelSourceListingDetails })?.data

				return {
					data: {
						...requestDetails,
						channelSourceListingDetails: {
							channelSourceListingStatus: listingDetails?.channelSourceListingStatus,
							channelSourceListingStatusReason: listingDetails?.channelSourceListingStatusReason,
						},
					},
				}
			},
			providesTags: (result, error, args) => [{ id: args.channelSourceRequestId, type: "ChannelSourceRequest" }],
		}),

		deleteChannelSource: builder.mutation<any, string>({
			invalidatesTags: (res, error, id) => {
				if (!res) return []

				return [{ id, type: "ChannelSource" }]
			},
			query: (id) => ({ method: "DELETE", url: `/channel-source/${id}` }),
		}),

		updateChannelSourceRequestAction: builder.mutation<any, UpdateChannelSourceRequestActionBody>({
			invalidatesTags: (res, error, { channelSourceRequestId }) => {
				if (!res) return []

				return [
					{ id: channelSourceRequestId, type: "ChannelSourceRequest" },
					{ id: "LIST", type: "ChannelSourceRequest" },
					{ id: "LIST", type: "ChannelSourceListing" },
				]
			},
			query: (body) => ({ body, method: "PUT", url: "/channel-source/request/action" }),
		}),

		updateChannelSourceListingStatus: builder.mutation<any, UpdateChannelSourceListingStatusBody>({
			invalidatesTags: (res, error, { channelSourceListingId }) => {
				if (!res) return []

				return [
					{ id: channelSourceListingId, type: "ChannelSourceListing" },
					{ id: "LIST", type: "ChannelSourceListing" },
				]
			},
			query: ({ channelSourceListingId, ...body }) => ({
				body,
				method: "PUT",
				url: `/channel-source/listing/${channelSourceListingId}/status`,
			}),
		}),

		activateChannelSourceListing: builder.mutation<any, { active: boolean; channelSourceListingId: string }>({
			invalidatesTags: (res, error, { channelSourceListingId }) => {
				if (!res) return []

				return [
					{ id: channelSourceListingId, type: "ChannelSourceListing" },
					{ id: "LIST", type: "ChannelSourceListing" },
				]
			},
			query: ({ channelSourceListingId, ...body }) => ({
				body,
				method: "PUT",
				url: `/channel-source/listing/${channelSourceListingId}/active`,
			}),
		}),

		getChannelSourceOptOutList: builder.query<GetListReturnType<ChannelSourceOptOut>, GetChannelSourceOptOutListParams>(
			{
				providesTags: (result) =>
					providesList(
						result?.list?.map(({ id }) => id),
						"ChannelSourceOptedOut"
					),
				query: ({ channelSourceId, ...params }) => ({ params, url: `/channel-source/${channelSourceId}/opt-out` }),
				transformResponse,
			}
		),

		importChannelSourceOptOut: builder.mutation<any, ImportChannelSourceOptOutBody>({
			invalidatesTags: (res) => (res ? [{ id: "LIST", type: "ChannelSourceOptedOut" }] : []),
			query: ({ channelSourceId, optOutFile }) => ({
				body: optOutFile,
				method: "POST",
				url: `/channel-source/${channelSourceId}/opt-out/import`,
			}),
		}),

		optInOptedOutChannelSourceList: builder.mutation<any, OptInOptedOutChannelSourceListBody>({
			invalidatesTags: (res) => (res ? [{ id: "LIST", type: "ChannelSourceOptedOut" }] : []),
			query: ({ channelSourceId, ...body }) => ({
				body,
				method: "POST",
				url: `/channel-source/${channelSourceId}/opt-out/delete`,
			}),
		}),

		exportChannelSourceOptOutList: builder.mutation<any, ExportChannelSourceOptOutListParams>({
			query: ({ fileName, channelSourceId, ...params }) => ({
				cache: "no-cache",
				method: "GET",
				responseHandler: async (response: Response) => {
					if (response?.status == 200) downloadFile(fileName, await response.blob())

					return response
				},
				url: `/channel-source/${channelSourceId}/opt-out/export`,
				params: { fileName, ...params },
			}),
		}),

		addBulkChannelSourceRequests: builder.mutation<any, AddBulkChannelSourceRequestsBody>({
			invalidatesTags: (res) => {
				return res ? [{ id: "LIST", type: "ChannelSourceRequest" }] : []
			},
			query: (body) => ({ body, method: "POST", url: "/channel-source/request/bulk" }),
		}),

		addBulkChannelSourceListings: builder.mutation<any, AddBulkChannelSourceRequestsBody>({
			invalidatesTags: (res) => {
				return res ? [{ id: "LIST", type: "ChannelSourceListing" }] : []
			},
			query: (body) => ({ body, method: "POST", url: "/channel-source/listing/bulk" }),
		}),

		getCompaniesList: builder.query<GetListReturnType<Record<"id" | "name", string>>, undefined>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"Company"
				),
			query: () => "/company",
			transformResponse,
		}),

		getUsersByCompanyId: builder.query<GetListReturnType<UserInCompany>, { companyId: string }>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"UserInCompany"
				),
			query: (params) => ({ url: "/user", params }),
			transformResponse,
		}),
	}),
})

export const {
	useGetChannelSourceRequestsQuery,
	useGetChannelSourceRequestAndListingByIdQuery,
	useDeleteChannelSourceMutation,
	useUpdateChannelSourceRequestActionMutation,
	useUpdateChannelSourceListingStatusMutation,
	useActivateChannelSourceListingMutation,
	useGetChannelSourceOptOutListQuery,
	useImportChannelSourceOptOutMutation,
	useOptInOptedOutChannelSourceListMutation,
	useExportChannelSourceOptOutListMutation,
	useAddBulkChannelSourceRequestsMutation,
	useAddBulkChannelSourceListingsMutation,
	useGetCompaniesListQuery,
	useGetUsersByCompanyIdQuery,
} = smsSendersManagementApis
