//#region Import
import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import type {
	SmsTemplateType,
	GetSmsTemplatesParams,
	DeleteSmsTemplatesBody,
	AddNewSmsTemplateBody,
	UpdateSmsTemplateBody,
} from "./types"
//#endregion

const smsTemplatesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getSmsTemplates: builder.query<GetListReturnType<SmsTemplateType>, GetSmsTemplatesParams>({
			query: (params) => ({ url: "/template/sms", params }),
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"SmsTemplate"
				),
			transformResponse,
		}),

		getSmsTemplateById: builder.query<SmsTemplateType, string>({
			query: (id) => `/template/sms/${id}`,
			providesTags: (result) => [{ type: "SmsTemplate", id: result?.id }],
			transformResponse,
		}),

		addNewSmsTemplate: builder.mutation<any, AddNewSmsTemplateBody>({
			query: (body) => ({ url: "/template/sms", method: "POST", body }),
			invalidatesTags: (res) => (res ? [{ type: "SmsTemplate", id: "LIST" }] : []),
		}),

		updateSmsTemplate: builder.mutation<any, UpdateSmsTemplateBody>({
			query: ({ id, ...body }) => ({ url: `/template/sms/${id}`, method: "PATCH", body }),
			invalidatesTags: (res) => (res ? [{ type: "SmsTemplate", id: res?.id }] : []),
		}),

		deleteSmsTemplates: builder.mutation<any, DeleteSmsTemplatesBody>({
			query: (templatesIds) => ({ url: `/template/sms/delete`, method: "POST", body: { templatesIds } }),
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
