//#region Import
import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import type { ListDataReturnType } from "@/core/lib/redux-toolkit/types"

import type {
	SmsTemplateType,
	GetSmsTemplatesArgs,
	DeleteSmsTemplatesArgs,
	AddNewSmsTemplateArgs,
	UpdateSmsTemplateArgs,
} from "./types"
//#endregion

const smsTemplatesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getSmsTemplates: builder.query<ListDataReturnType<SmsTemplateType>, GetSmsTemplatesArgs>({
			query: (params) => ({ url: "/templates", params }),
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"SmsTemplate"
				),
			transformResponse,
		}),

		getSmsTemplateById: builder.query<SmsTemplateType, string>({
			query: (id) => `/templatesById/${id}`,
			providesTags: (result) => [{ type: "SmsTemplate", id: result?.id }],
			// transformResponse,
		}),

		addNewSmsTemplate: builder.mutation<any, AddNewSmsTemplateArgs>({
			query: (body) => ({ url: "/templatesById", method: "POST", body }),
			invalidatesTags: (res) => (res ? [{ type: "SmsTemplate", id: "LIST" }] : []),
		}),

		updateSmsTemplate: builder.mutation<any, UpdateSmsTemplateArgs>({
			query: ({ id, ...body }) => ({ url: `/templatesById/${id}`, method: "PUT", body }),
			invalidatesTags: (res) => (res ? [{ type: "SmsTemplate", id: "LIST" }] : []),
		}),

		deleteSmsTemplates: builder.mutation<any, DeleteSmsTemplatesArgs>({
			query: (templatesIds) => ({ url: `/templates/delete`, method: "POST", body: { templatesIds } }),
			invalidatesTags: (res) => (res ? [{ type: "SmsTemplate", id: "LIST" }] : []),
		}),
	}),
})

export const {
	useGetSmsTemplatesQuery,
	useGetSmsTemplateByIdQuery,
	useAddNewSmsTemplateMutation,
	useUpdateSmsTemplateMutation,
	useDeleteSmsTemplatesMutation,
} = smsTemplatesApi
