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
	SmsIndustryTemplateType,
	GetSmsIndustryTemplatesArgs,
	UpdateSmsIndustryTemplateArgs,
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
			query: (body) => ({ url: "/industry", method: "POST", body }),
			invalidatesTags: (res) => (res ? [{ type: "Industry", id: "LIST" }] : []),
		}),

		updateIndustry: builder.mutation<any, UpdateIndustryArgs>({
			query: ({ id, ...body }) => ({ url: `/industry/${id}`, method: "PATCH", body }),
			invalidatesTags: (res, error, { id }) => {
				if (!res) return []

				return [{ type: "Industry", id }]
			},
		}),

		deleteIndustry: builder.mutation<any, string>({
			query: (id) => ({ url: `/industry/${id}`, method: "DELETE" }),
			invalidatesTags: (res, error, id) => {
				if (!res) return []

				return [{ type: "Industry", id }]
			},
		}),

		// SMS Industry Templates Queries/Mutations

		getSmsIndustryTemplates: builder.query<ListDataReturnType<SmsIndustryTemplateType>, GetSmsIndustryTemplatesArgs>({
			query: (params) => ({ url: "/template/prebuilt", params }),
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"SmsIndustryTemplate"
				),
			transformResponse,
		}),

		getSmsIndustryTemplateById: builder.query<SmsIndustryTemplateType, string>({
			query: (prebuiltTemplateId) => `/template/prebuilt/${prebuiltTemplateId}`,
			providesTags: (result) => [{ type: "SmsIndustryTemplate", id: result?.id }],
			transformResponse,
		}),

		addNewSmsIndustryTemplate: builder.mutation<any, AddNewSmsIndustryTemplateArgs>({
			query: (body) => ({ url: "/templatesById", method: "POST", body }),
			invalidatesTags: (res) => (res ? [{ type: "Industry", id: "LIST" }] : []),
		}),

		updateSmsIndustryTemplate: builder.mutation<any, UpdateSmsIndustryTemplateArgs>({
			query: ({ id, ...body }) => ({ url: `/templatesById/${id}`, method: "PUT", body }),
			invalidatesTags: (res) => (res ? [{ type: "SmsTemplate", id: "LIST" }] : []),
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
	// SMS Industry Templates hooks
	useGetSmsIndustryTemplatesQuery,
	useGetSmsIndustryTemplateByIdQuery,
	useAddNewSmsIndustryTemplateMutation,
	useUpdateSmsIndustryTemplateMutation,
	useDeleteIndustryTemplatesMutation,
} = industriesApi
