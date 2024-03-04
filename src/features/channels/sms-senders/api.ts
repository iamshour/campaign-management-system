/* eslint-disable perfectionist/sort-objects*/

//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"

import type { AddSmsListingBody, GetSmsSendersParams, SmsListingsFilter, SmsListingType, SmsSenderType } from "./types"
//#endregion

const smsSendersApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getSmsSenders: builder.query<GetListReturnType<SmsSenderType>, GetSmsSendersParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"SmsSender"
				),
			query: ({ channelType, ...params }) => ({
				params,
				// TODO: in integration; use same endpoint with filter
				url: channelType === "local" ? "/localSenders" : "/internationalSenders",
			}),
			transformResponse,
		}),

		getSmsSenderById: builder.query<SmsSenderType, string>({
			providesTags: (result) => [{ id: result?.id, type: "SmsSender" }],
			// TODO: in integration; change below 65dda90d5cddf38ab869f080" ?? id to id
			query: (id) => `/senders/${"65dda90d5cddf38ab869f080" ?? id}`,
		}),

		addSmsListing: builder.mutation<any, AddSmsListingBody>({
			invalidatesTags: (res) => {
				return res ? [{ id: "LIST", type: "SmsSender" }] : []
			},
			query: (body) => ({ body, method: "POST", url: "/requests" }),
		}),

		getSmsListings: builder.query<GetListReturnType<SmsListingType>, SmsListingsFilter>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"SmsListing"
				),
			query: ({ channelType, type }) => ({
				channelType,
				type,
				// TODO: in integration; set url as endpoint with filters channelType and type
				url: `/listings${Math.ceil(Math.random() * 4)}`,
			}),
			transformResponse,
		}),

		getSmsListingById: builder.query<SmsListingType, string>({
			providesTags: (result) => [{ id: result?.id, type: "SmsListing" }],
			// TODO: in integration; change below 65ddd3877ce29dce66cdf0d9" ?? id to id
			query: (id) => `/listings/${"65ddd3877ce29dce66cdf0d9" ?? id}`,
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
	useAddSmsListingMutation,
	useGetSmsSenderByIdQuery,
	useGetSmsListingsQuery,
	useGetSmsListingByIdQuery,
	useActivateSmsListingMutation,
	useDeactivateSmsListingMutation,
} = smsSendersApi
