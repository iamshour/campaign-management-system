//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"

import type {
	AddNewSmsTemplateBody,
	DeleteSmsTemplatesBody,
	GetSmsTemplatesParams,
	SmsTemplateType,
	UpdateSmsTemplateBody,
} from "./types"
//#endregion

const smsTemplatesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		addNewSmsTemplate: builder.mutation<any, AddNewSmsTemplateBody>({
			invalidatesTags: (res) => (res ? [{ id: "LIST", type: "SmsTemplate" }] : []),
			query: (body) => ({ body, method: "POST", url: "/template/sms" }),
		}),

		deleteSmsTemplates: builder.mutation<any, DeleteSmsTemplatesBody>({
			invalidatesTags: (res) => (res ? [{ id: "LIST", type: "SmsTemplate" }] : []),
			query: (body) => ({ body, method: "POST", url: `/template/sms/delete` }),
		}),

		getSmsTemplateById: builder.query<SmsTemplateType, string>({
			providesTags: (result) => [{ id: result?.id, type: "SmsTemplate" }],
			query: (id) => `/template/sms/${id}`,
			transformResponse,
		}),

		getSmsTemplates: builder.query<GetListReturnType<SmsTemplateType>, GetSmsTemplatesParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"SmsTemplate"
				),
			query: (params) => ({ params, url: "/template/sms" }),
			transformResponse,
		}),

		updateSmsTemplate: builder.mutation<any, UpdateSmsTemplateBody>({
			invalidatesTags: (res) => (res ? [{ id: res?.id, type: "SmsTemplate" }] : []),
			query: ({ id, ...body }) => ({ body, method: "PATCH", url: `/template/sms/${id}` }),
		}),
	}),
})

export const {
	useAddNewSmsTemplateMutation,
	useDeleteSmsTemplatesMutation,
	useGetSmsTemplateByIdQuery,
	useGetSmsTemplatesQuery,
	useUpdateSmsTemplateMutation,
} = smsTemplatesApi
