/* eslint-disable perfectionist/sort-objects*/

//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"
import type { ChannelSourceListingDetails } from "@/features/channels/common/types/data.types"
import type {
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
	GetSmsOptedOutSendersParams,
	OptInSmsSendersBody,
	SmsOptedOutSenderType,
	UpdateSmsSourceRequestBody,
	UserInCompany,
} from "./types"
import type {
	GetChannelSourceRequestAndListingByIdReturnType,
	GetChannelSourceRequestsParams,
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

		updateSmsSourceRequest: builder.mutation<any, UpdateSmsSourceRequestBody>({
			invalidatesTags: (res, error, { requestId }) => {
				if (!res) return []

				return [{ id: requestId, type: "ChannelSourceRequest" }]
			},
			query: ({ requestId, ...body }) => ({ body, method: "PUT", url: `/source-request/status/${requestId}` }),
		}),

		getSmsOptedOutSenders: builder.query<GetListReturnType<SmsOptedOutSenderType>, GetSmsOptedOutSendersParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"OptInSender"
				),
			query: (params) => ({ params, url: "/sms-opted-out" }),
			transformResponse,
		}),

		optInSmsSenders: builder.mutation<any, OptInSmsSendersBody>({
			invalidatesTags: (res) => (res ? [{ id: "LIST", type: "OptInSender" }] : []),
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

		importOptedOutSmsSenders: builder.mutation<any, FormData>({
			invalidatesTags: (res) => (res ? [{ id: "LIST", type: "OptInSender" }] : []),
			query: (body) => ({ body, method: "PATCH", url: "/import-opted-out" }),
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

	useUpdateSmsSourceRequestMutation,
	useGetSmsOptedOutSendersQuery,
	useOptInSmsSendersMutation,
	useExportOptOutSmsSendersMutation,
	useImportOptedOutSmsSendersMutation,
	useAddBulkSmsListingRequestsMutation,
	useAddBulkSmsListingsMutation,
	useGetCompaniesListQuery,
	useGetUsersByCompanyIdQuery,
} = smsSendersManagementApis
