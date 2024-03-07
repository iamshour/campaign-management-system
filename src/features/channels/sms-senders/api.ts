/* eslint-disable perfectionist/sort-objects*/

//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"

import type { AddSmsRequestBody, GetSmsSendersParams, GetSmsSendersResponseType, SmsSenderType } from "./types"
//#endregion

const smsSendersApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getSmsSenders: builder.query<GetListReturnType<GetSmsSendersResponseType>, GetSmsSendersParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"SmsSender"
				),
			query: (params) => ({
				params,
				url: "/channel-source",
			}),
			transformResponse,
		}),

		getSmsSenderById: builder.query<SmsSenderType, string>({
			providesTags: (result) => [{ id: result?.id, type: "SmsSender" }],
			// TODO: in integration; change below 65dda90d5cddf38ab869f080" ?? id to id
			query: (id) => `/senders/${"65dda90d5cddf38ab869f080" ?? id}`,
		}),

		addSmsRequest: builder.mutation<any, AddSmsRequestBody>({
			invalidatesTags: (res) => {
				return res ? [{ id: "LIST", type: "SmsSender" }] : []
			},
			query: (body) => ({ body, method: "POST", url: "/requests" }),
		}),

		activateSmsListing: builder.mutation<any, string>({
			invalidatesTags: (res) => {
				return res ? [{ id: "LIST", type: "SmsListing" }] : []
			},
			query: (listingId) => ({ method: "PUT", url: `/listings/${listingId}/active` }),
		}),

		deactivateSmsListing: builder.mutation<any, string>({
			invalidatesTags: (res) => {
				return res ? [{ id: "LIST", type: "SmsListing" }] : []
			},
			query: (listingId) => ({ method: "PUT", url: `/listings/${listingId}/deactivate` }),
		}),
	}),
})

export const {
	useGetSmsSendersQuery,
	useAddSmsRequestMutation,
	useGetSmsSenderByIdQuery,
	useActivateSmsListingMutation,
	useDeactivateSmsListingMutation,
} = smsSendersApi
