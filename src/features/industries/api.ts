//#region Import
import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import type { ListDataReturnType } from "@/core/lib/redux-toolkit/types"
import { getListOfKey } from "@/utils"

import type {
	IndustryType,
	GetIndustriesListArgs,
	AddNewIndustryArgs,
	DeleteIndustryTemplatesArgs,
	UpdateIndustryArgs,
	AddNewSmsIndustryTemplateArgs,
} from "./types"
//#endregion

const industriesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getIndustries: builder.query<ListDataReturnType<IndustryType>, GetIndustriesListArgs>({
			query: (params) => ({ url: "/industry", params }),
			providesTags: (result) => providesList(getListOfKey(result?.list, "id"), "Industry"),
			transformResponse,
		}),

		addNewIndustry: builder.mutation<any, AddNewIndustryArgs>({
			query: (body) => ({ url: "/industryById", method: "POST", body }),
			invalidatesTags: (res) => (res ? [{ type: "Industry", id: "LIST" }] : []),
		}),

		updateIndustry: builder.mutation<any, UpdateIndustryArgs>({
			query: ({ id, ...body }) => ({ url: `/industryById/${id}`, method: "PUT", body }),
			invalidatesTags: (res) => (res ? [{ type: "Industry", id: "LIST" }] : []),
		}),

		deleteIndustry: builder.mutation<any, string>({
			query: (id) => ({ url: `/industryById/${id}`, method: "DELETE" }),
			invalidatesTags: (res, error, id) => {
				if (!res) return []

				return [{ type: "Industry", id }]
			},
		}),

		addNewSmsIndustryTemplate: builder.mutation<any, AddNewSmsIndustryTemplateArgs>({
			query: (body) => ({ url: "/templatesById", method: "POST", body }),
			invalidatesTags: (res) => (res ? [{ type: "Industry", id: "LIST" }] : []),
		}),

		deleteIndustryTemplates: builder.mutation<any, DeleteIndustryTemplatesArgs>({
			query: ({ id, templatesIds }) => ({ url: `/templates/delete/${id}`, method: "POST", body: { templatesIds } }),
			invalidatesTags: (res) => (res ? [{ type: "Industry", id: "LIST" }] : []),
		}),
	}),
})

export const {
	useGetIndustriesQuery,
	useAddNewIndustryMutation,
	useUpdateIndustryMutation,
	useDeleteIndustryMutation,
	useAddNewSmsIndustryTemplateMutation,
	useDeleteIndustryTemplatesMutation,
} = industriesApi
