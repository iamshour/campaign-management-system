//#region Import
import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import type { ListDataReturnType } from "@/core/lib/redux-toolkit/types"
import { getListOfKey } from "@/utils"

import type { IndustryType, GetIndustriesArgs, AddNewIndustryArgs, UpdateIndustryArgs } from "./types"
//#endregion

const industriesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getIndustries: builder.query<ListDataReturnType<IndustryType>, GetIndustriesArgs>({
			query: (params) => ({ url: "/industry", params }),
			providesTags: (result) => providesList(getListOfKey(result?.list, "id"), "Industry"),
			transformResponse,
		}),

		addNewIndustry: builder.mutation<any, AddNewIndustryArgs>({
			query: (body) => ({ url: "/industryById", method: "POST", body }),
			invalidatesTags: (res) => (res ? [{ type: "Industry", id: "LIST" }] : []),
		}),

		updateSmsTemplate: builder.mutation<any, UpdateIndustryArgs>({
			query: ({ id, ...body }) => ({ url: `/industryById/${id}`, method: "PUT", body }),
			invalidatesTags: (res) => (res ? [{ type: "Industry", id: "LIST" }] : []),
		}),
	}),
})

export const { useGetIndustriesQuery, useAddNewIndustryMutation, useUpdateSmsTemplateMutation } = industriesApi
