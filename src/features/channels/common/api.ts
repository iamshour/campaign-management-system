/* eslint-disable perfectionist/sort-objects*/

//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"

import type { GetSmsListingdParams, SmsListingType } from "./types"
import type { GetChannelSourcesParams } from "./types/api.types"
import type { ChannelSource } from "./types/data.types"
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

		getSmsListings: builder.query<GetListReturnType<SmsListingType>, GetSmsListingdParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ listingId }) => listingId),
					"SmsListing"
				),
			query: (params) => ({
				params,
				// TODO: in integration; set url as endpoint with filters channelType and type
				url: `/listings${Math.ceil(Math.random() * 4)}`,
			}),
			transformResponse,
		}),

		getSmsListingById: builder.query<SmsListingType, string>({
			providesTags: (result) => [{ id: result?.listingId, type: "SmsListing" }],
			// TODO: in integration; change below 65ddd3877ce29dce66cdf0d9" ?? id to id
			query: (id) => `/listings/${"65ddd3877ce29dce66cdf0d9" ?? id}`,
		}),
	}),
})

export const { useGetChannelSourcesQuery, useGetSmsListingsQuery, useGetSmsListingByIdQuery } = commonSmsChannelApi
