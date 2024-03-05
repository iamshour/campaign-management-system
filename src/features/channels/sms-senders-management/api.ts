/* eslint-disable perfectionist/sort-objects*/

//#region Import
import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import type { GetSmsListingRequestsParams, GetSmsSenderRequestDetailsByIdType, SmsListingRequest } from "./types"
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

		getSmsListingRequestById: builder.query<GetSmsSenderRequestDetailsByIdType, string>({
			providesTags: (result) => [{ id: result?.requestId, type: "SmsListingRequest" }],
			query: (id) => ({ url: `/sms-sender-request-details/${id}` }),
			transformResponse,
		}),
	}),
})

export const { useGetSmsListingRequestsQuery, useGetSmsListingRequestByIdQuery } = smsSendersManagementApis
