//#region Import
import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import type { ListDataReturnType } from "@/core/lib/redux-toolkit/types"
import { getListOfKey } from "@/utils"

import { GetIndustryListArgs, IndustryType } from "./types"
//#endregion

const industryApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getIndustryList: builder.query<ListDataReturnType<IndustryType>, GetIndustryListArgs>({
			query: (params) => ({ url: "/industry", params }),
			providesTags: (result) => providesList(getListOfKey(result?.list, "id"), "Industry"),
			transformResponse,
		}),
	}),
})

export const { useGetIndustryListQuery } = industryApi
