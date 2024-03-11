/* eslint-disable perfectionist/sort-objects*/

//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"

import type { GetChannelSourceListingsParams, GetChannelSourcesParams } from "./types/api.types"
import type { ChannelSource, ChannelSourceListing, ChannelSourceListingDetails } from "./types/data.types"
//#endregion

const commonSmsChannelApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getChannelSources: builder.query<GetListReturnType<ChannelSource>, GetChannelSourcesParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"ChannelSource"
				),
			query: (params) => ({
				params,
				url: "/channel-source",
			}),
			transformResponse,
		}),

		getChannelSourceListings: builder.query<GetListReturnType<ChannelSourceListing>, GetChannelSourceListingsParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"ChannelSourceListing"
				),
			query: ({ channelSourceId, ...params }) => ({
				params,
				url: `/channel-source/${channelSourceId}/listing`,
			}),
			transformResponse,
		}),

		getChannelSourceListingById: builder.query<ChannelSourceListingDetails, string>({
			providesTags: (result) => [{ id: result?.id, type: "ChannelSourceListing" }],
			query: (channelSourceListingId) => `/channel-source/listing/${channelSourceListingId}`,
			transformResponse,
		}),
	}),
})

export const { useGetChannelSourcesQuery, useGetChannelSourceListingsQuery, useGetChannelSourceListingByIdQuery } =
	commonSmsChannelApi
