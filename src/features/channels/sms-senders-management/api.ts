/* eslint-disable perfectionist/sort-objects*/

//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"
import type { ChannelSourceListingDetails } from "@/features/channels/common/types/data.types"
import type {
	ChannelSourceOptOut,
	ChannelSourceRequest,
	ChannelSourceRequestDetails,
} from "@/features/channels/sms-senders-management/types/data.types"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import { downloadFile } from "@/utils"

import type {
	AddBulkSmsListingRequestsBody,
	AddBulkSmsListingsBody,
	ExportOptOutSmsSendersParams,
	OptInSmsSendersBody,
	UserInCompany,
} from "./types"
import type {
	GetChannelSourceOptOutListParams,
	GetChannelSourceRequestAndListingByIdReturnType,
	GetChannelSourceRequestsParams,
	ImportOptOutFileBody,
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

		updateChannelSourceRequestAction: builder.mutation<any, UpdateChannelSourceRequestActionBody>({
			invalidatesTags: (res, error, { channelSourceRequestId }) => {
				if (!res) return []

				return [
					{ id: channelSourceRequestId, type: "ChannelSourceRequest" },
					{ id: "LIST", type: "ChannelSourceRequest" },
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

		importOptOutFile: builder.mutation<any, ImportOptOutFileBody>({
			invalidatesTags: (res) => (res ? [{ id: "LIST", type: "ChannelSourceOptedOut" }] : []),
			query: ({ channelSourceId, optOutFile }) => ({
				body: optOutFile,
				method: "POST",
				url: `/channel-source/${channelSourceId}/opt-out/import`,
			}),
		}),

		// ---------------------------------

		optInSmsSenders: builder.mutation<any, OptInSmsSendersBody>({
			invalidatesTags: (res) => (res ? [{ id: "LIST", type: "ChannelSourceOptedOut" }] : []),
			query: (body) => ({ body, method: "POST", url: "/opt-in-senders" }),
		}),

		exportOptOutSmsSenders: builder.mutation<any, ExportOptOutSmsSendersParams>({
			query: ({ fileName, ...params }) => ({
				cache: "no-cache",
				method: "GET",
				responseHandler: async (response: Response) => {
					if (response?.status == 200) downloadFile(fileName, await response.blob())

					return response
				},
				url: "/opt-out-export",
				params: { fileName, ...params },
			}),
		}),

		addBulkSmsListingRequests: builder.mutation<any, AddBulkSmsListingRequestsBody>({
			invalidatesTags: (res) => {
				return res ? [{ id: "LIST", type: "ChannelSourceRequest" }] : []
			},
			query: (body) => ({ body, method: "POST", url: "/channel-source/request/bulk" }),
		}),

		addBulkSmsListings: builder.mutation<any, AddBulkSmsListingsBody>({
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

		getUsersByCompanyId: builder.query<GetListReturnType<UserInCompany>, string>({
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
	useUpdateChannelSourceRequestActionMutation,
	useUpdateChannelSourceListingStatusMutation,
	useActivateChannelSourceListingMutation,
	useGetChannelSourceOptOutListQuery,
	useImportOptOutFileMutation,

	useOptInSmsSendersMutation,
	useExportOptOutSmsSendersMutation,
	useAddBulkSmsListingRequestsMutation,
	useAddBulkSmsListingsMutation,
	useGetCompaniesListQuery,
	useGetUsersByCompanyIdQuery,
} = smsSendersManagementApis
