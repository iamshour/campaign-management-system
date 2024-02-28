//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"

import type { GetSmsSendersParams, SmsSenderType } from "./types"
//#endregion

const smsSendersApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getSmsSenders: builder.query<GetListReturnType<SmsSenderType>, GetSmsSendersParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"Sender"
				),
			query: ({ channelType, ...params }) => ({
				params,
				// TODO: in integration, use same endpoint with filter
				url: channelType === "local" ? "/localSenders" : "/internationalSenders",
			}),
			transformResponse,
		}),
	}),
})

export const { useGetSmsSendersQuery } = smsSendersApi
