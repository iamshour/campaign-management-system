/* eslint-disable perfectionist/sort-objects*/

//#region Import
import api from "@/core/lib/redux-toolkit/api"
import { transformResponse } from "@/core/lib/redux-toolkit/helpers"

import type {
	AddChannelSourceRequestBody,
	ResendChannelSourceRequestBody,
	ToggleChannelSourceListingActivationBody,
} from "./types/api.types"

import { ChannelSource } from "../common/types/data.types"
//#endregion

const smsSendersApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getChannelSourceById: builder.query<ChannelSource, string>({
			providesTags: (result) => [{ id: result?.id, type: "ChannelSource" }],
			query: (id) => `/senders/${id}`,
			transformResponse,
		}),

		addChannelSourceRequest: builder.mutation<any, AddChannelSourceRequestBody>({
			invalidatesTags: (res, _error, { channelSourceId }) =>
				res
					? [
							{ id: "LIST", type: "ChannelSource" },
							{ id: channelSourceId, type: "ChannelSource" },
							{ id: "LIST", type: "ChannelSourceListing" },
						]
					: [],
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			query: ({ channelSourceId, ...body }) => ({ body, method: "POST", url: "/channel-source/request" }),
		}),

		resendChannelSourceRequest: builder.mutation<any, ResendChannelSourceRequestBody>({
			invalidatesTags: (res, _error, { channelSourceId }) =>
				res
					? [
							{ id: "LIST", type: "ChannelSource" },
							{ id: channelSourceId, type: "ChannelSource" },
							{ id: "LIST", type: "ChannelSourceListing" },
						]
					: [],
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			query: ({ channelSourceId, ...body }) => ({ body, method: "POST", url: "/channel-source/request/resend" }),
		}),

		toggleChannelSourceListingActivation: builder.mutation<any, ToggleChannelSourceListingActivationBody>({
			invalidatesTags: (res) => {
				return res ? [{ id: "LIST", type: "ChannelSourceListing" }] : []
			},
			query: ({ listingId, ...body }) => ({ body, method: "PUT", url: `/channel-source/listing/${listingId}/active` }),
		}),
	}),
})

export const {
	useGetChannelSourceByIdQuery,
	useAddChannelSourceRequestMutation,
	useResendChannelSourceRequestMutation,
	useToggleChannelSourceListingActivationMutation,
} = smsSendersApi
