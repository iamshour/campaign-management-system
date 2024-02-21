//#region Import
import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"
import { getListOfKey } from "@/utils"

import type {
	IndustryType,
	GetIndustriesParams,
	AddNewIndustryBody,
	DeleteIndustryTemplatesBody,
	UpdateIndustryBody,
	SmsIndustryTemplateType,
	GetSmsIndustryTemplatesParams,
} from "./types"
//#endregion

const industriesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getIndustries: builder.query<GetListReturnType<IndustryType>, GetIndustriesParams>({
			query: (params) => ({ url: "/industry", params }),
			providesTags: (result) => providesList(getListOfKey(result?.list, "id"), "Industry"),
			transformResponse,
		}),

		addNewIndustry: builder.mutation<any, AddNewIndustryBody>({
			query: (body) => ({ url: "/industry", method: "POST", body }),
			invalidatesTags: (res) => (res ? [{ type: "Industry", id: "LIST" }] : []),
		}),

		updateIndustry: builder.mutation<any, UpdateIndustryBody>({
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

		getSmsIndustryTemplates: builder.query<GetListReturnType<SmsIndustryTemplateType>, GetSmsIndustryTemplatesParams>({
			query: (params) => ({ url: "/template/prebuilt", params }),
			providesTags: (result, error, arg) => [{ type: "Industry", id: arg?.industryId }],
			transformResponse,
		}),

		getSmsIndustryTemplateById: builder.query<SmsIndustryTemplateType, string>({
			query: (prebuiltTemplateId) => `/template/prebuilt/${prebuiltTemplateId}`,
			providesTags: (result) => [{ type: "SmsIndustryTemplate", id: result?.id }],
			transformResponse,
		}),

		addNewSmsIndustryTemplate: builder.mutation<any, { industryId: string; body: FormData }>({
			query: ({ body }) => ({ url: "/template/prebuilt", method: "POST", body }),
			invalidatesTags: (res, error, { industryId }) => (res ? [{ type: "Industry", id: industryId }] : []),
		}),

		updateSmsIndustryTemplate: builder.mutation<any, { industryId: string; templateId: string; body: FormData }>({
			query: ({ templateId, body }) => ({
				url: `/template/prebuilt/${templateId}`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (res, error, { industryId, templateId }) =>
				res
					? [
							{ type: "Industry", id: industryId },
							{ type: "SmsIndustryTemplate", id: templateId },
						]
					: [],
		}),

		deleteIndustryTemplates: builder.mutation<any, DeleteIndustryTemplatesBody>({
			query: (body) => ({ url: `/template/prebuilt/delete`, method: "POST", body }),
			invalidatesTags: (res, error, { industryId }) => (res ? [{ type: "Industry", id: industryId }] : []),
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
