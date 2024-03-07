/* eslint-disable perfectionist/sort-objects*/

//#region Import
import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import { GetListReturnType } from "@/core/lib/redux-toolkit/types"
import { downloadFile } from "@/utils"

import type {
	ExportOptOutSmsSendersParams,
	GetSmsListingRequestsParams,
	GetSmsOptedOutSendersParams,
	OptInSmsSendersBody,
	SmsListingRequest,
	SmsOptedOutSenderType,
	SmsSenderRequestDetailsType,
	UpdateSmsListingStatusBody,
	UpdateSmsSourceRequestBody,
} from "./types"
//#endregion

// eslint-disable-next-line
const smsSendersManagementApis = api.injectEndpoints({
	endpoints: (builder) => ({
		getSmsListingRequests: builder.query<GetListReturnType<SmsListingRequest>, GetSmsListingRequestsParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"SmsListingRequest"
				),
			query: ({ status, ...params }) => ({ params, url: `/sms-listing-requests-${status?.toLocaleLowerCase()}` }),
			transformResponse,
		}),

		getSmsListingRequestById: builder.query<SmsSenderRequestDetailsType, string>({
			providesTags: (result) => [{ id: result?.requestId, type: "SmsListingRequest" }],
			query: (id) => ({ url: `/sms-sender-request-details/${id}` }),
			transformResponse,
		}),

		updateSmsListingStatus: builder.mutation<any, UpdateSmsListingStatusBody>({
			invalidatesTags: (res, error, { listingId }) => {
				if (!res) return []

				return [{ id: listingId, type: "SmsListingRequest" }]
			},
			query: ({ listingId, ...body }) => ({ body, method: "PUT", url: `/source-request/status/${listingId}` }),
		}),

		updateSmsSourceRequest: builder.mutation<any, UpdateSmsSourceRequestBody>({
			invalidatesTags: (res, error, { requestId }) => {
				if (!res) return []

				return [{ id: requestId, type: "SmsListingRequest" }]
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
	}),
})

export const {
	useGetSmsListingRequestsQuery,
	useGetSmsListingRequestByIdQuery,
	useUpdateSmsListingStatusMutation,
	useUpdateSmsSourceRequestMutation,
	useGetSmsOptedOutSendersQuery,
	useOptInSmsSendersMutation,
	useExportOptOutSmsSendersMutation,
} = smsSendersManagementApis
