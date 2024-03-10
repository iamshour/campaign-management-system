/* eslint-disable perfectionist/sort-objects*/

//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"

import type { SmsListingType } from "./types"
import type { GetChannelSourceListingsParams, GetChannelSourcesParams } from "./types/api.types"
import type { ChannelSource, ChannelSourceListing } from "./types/data.types"
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

		getSmsListingById: builder.query<SmsListingType, string>({
			providesTags: (result) => [{ id: result?.listingId, type: "ChannelSourceListing" }],
			// TODO: in integration; change below 65ddd3877ce29dce66cdf0d9" ?? id to id
			query: (id) => `/listings/${"65ddd3877ce29dce66cdf0d9" ?? id}`,
		}),
	}),
})

export const { useGetChannelSourcesQuery, useGetChannelSourceListingsQuery, useGetSmsListingByIdQuery } =
	commonSmsChannelApi
