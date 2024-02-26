//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import { getListOfKey } from "@/utils"

import type {
	AddNewIndustryBody,
	DeleteIndustryTemplatesBody,
	GetIndustriesParams,
	GetSmsIndustryTemplatesParams,
	IndustryType,
	SmsIndustryTemplateType,
	UpdateIndustryBody,
} from "./types"
//#endregion

const industriesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		addNewIndustry: builder.mutation<any, AddNewIndustryBody>({
			invalidatesTags: (res) => (res ? [{ id: "LIST", type: "Industry" }] : []),
			query: (body) => ({ body, method: "POST", url: "/industry" }),
		}),

		addNewSmsIndustryTemplate: builder.mutation<any, { body: FormData; industryId: string }>({
			invalidatesTags: (res, error, { industryId }) => (res ? [{ id: industryId, type: "Industry" }] : []),
			query: ({ body }) => ({ body, method: "POST", url: "/template/prebuilt" }),
		}),

		deleteIndustry: builder.mutation<any, string>({
			invalidatesTags: (res, error, id) => {
				if (!res) return []

				return [{ id, type: "Industry" }]
			},
			query: (id) => ({ method: "DELETE", url: `/industry/${id}` }),
		}),

		deleteIndustryTemplates: builder.mutation<any, DeleteIndustryTemplatesBody>({
			invalidatesTags: (res, error, { industryId }) => (res ? [{ id: industryId, type: "Industry" }] : []),
			query: (body) => ({ body, method: "POST", url: `/template/prebuilt/delete` }),
		}),

		getIndustries: builder.query<GetListReturnType<IndustryType>, GetIndustriesParams>({
			providesTags: (result) => providesList(getListOfKey(result?.list, "id"), "Industry"),
			query: (params) => ({ params, url: "/industry" }),
			transformResponse,
		}),

		getSmsIndustryTemplateById: builder.query<SmsIndustryTemplateType, string>({
			providesTags: (result) => [{ id: result?.id, type: "SmsIndustryTemplate" }],
			query: (prebuiltTemplateId) => `/template/prebuilt/${prebuiltTemplateId}`,
			transformResponse,
		}),

		getSmsIndustryTemplates: builder.query<GetListReturnType<SmsIndustryTemplateType>, GetSmsIndustryTemplatesParams>({
			providesTags: (result, error, arg) => [{ id: arg?.industryId, type: "Industry" }],
			query: (params) => ({ params, url: "/template/prebuilt" }),
			transformResponse,
		}),

		updateIndustry: builder.mutation<any, UpdateIndustryBody>({
			invalidatesTags: (res, error, { id }) => {
				if (!res) return []

				return [{ id, type: "Industry" }]
			},
			query: ({ id, ...body }) => ({ body, method: "PATCH", url: `/industry/${id}` }),
		}),

		updateSmsIndustryTemplate: builder.mutation<any, { body: FormData; industryId: string; templateId: string }>({
			invalidatesTags: (res, error, { industryId, templateId }) =>
				res
					? [
							{ id: industryId, type: "Industry" },
							{ id: templateId, type: "SmsIndustryTemplate" },
						]
					: [],
			query: ({ body, templateId }) => ({
				body,
				method: "PATCH",
				url: `/template/prebuilt/${templateId}`,
			}),
		}),
	}),
})

export const {
	useAddNewIndustryMutation,
	useAddNewSmsIndustryTemplateMutation,
	useDeleteIndustryMutation,
	useDeleteIndustryTemplatesMutation,
	useGetIndustriesQuery,
	useGetSmsIndustryTemplateByIdQuery,
	// SMS Industry Templates hooks
	useGetSmsIndustryTemplatesQuery,
	useUpdateIndustryMutation,
	useUpdateSmsIndustryTemplateMutation,
} = industriesApi
