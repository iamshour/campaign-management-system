/* eslint-disable perfectionist/sort-objects*/

//#region Import
import api from "@/core/lib/redux-toolkit/api"

import type { ChannelSource } from "../common/types/data.types"
import type { AddSmsRequestBody } from "./types"
//#endregion

const smsSendersApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getSmsSenderById: builder.query<ChannelSource, string>({
			providesTags: (result) => [{ id: result?.id, type: "ChannelSource" }],
			// TODO: in integration; change below 65dda90d5cddf38ab869f080" ?? id to id
			query: (id) => `/senders/${"65dda90d5cddf38ab869f080" ?? id}`,
		}),

		addSmsRequest: builder.mutation<any, AddSmsRequestBody>({
			invalidatesTags: (res) => {
				return res ? [{ id: "LIST", type: "ChannelSource" }] : []
			},
			query: (body) => ({ body, method: "POST", url: "/channel-source/request" }),
		}),

		activateSmsListing: builder.mutation<any, string>({
			invalidatesTags: (res) => {
				return res ? [{ id: "LIST", type: "ChannelSourceListing" }] : []
			},
			query: (listingId) => ({ method: "PUT", url: `/listings/${listingId}/active` }),
		}),

		deactivateSmsListing: builder.mutation<any, string>({
			invalidatesTags: (res) => {
				return res ? [{ id: "LIST", type: "ChannelSourceListing" }] : []
			},
			query: (listingId) => ({ method: "PUT", url: `/listings/${listingId}/deactivate` }),
		}),
	}),
})

export const {
	useAddSmsRequestMutation,
	useGetSmsSenderByIdQuery,
	useActivateSmsListingMutation,
	useDeactivateSmsListingMutation,
} = smsSendersApi
