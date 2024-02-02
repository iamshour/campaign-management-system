//#region Import

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import type { ListDataReturnType } from "@/core/lib/redux-toolkit/types"

import type { SmsTemplate, GetSmsTemplatesArgs, GetSmsTemplateBytIdReturnType } from "./types"
//#endregion

const smsTemplatesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getSmsTemplates: builder.query<ListDataReturnType<SmsTemplate>, GetSmsTemplatesArgs>({
			query: (params) => ({ url: "/templates", params }),
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"MySmsTemplate"
				),
			transformResponse,
		}),

		getSmsTemplateById: builder.query<GetSmsTemplateBytIdReturnType, string>({
			query: (id) => `/templatesById/${id}`,
			providesTags: (result) => [{ type: "MySmsTemplate", id: result?.id }],
			// transformResponse,
		}),
	}),
})

export const { useGetSmsTemplatesQuery, useGetSmsTemplateByIdQuery } = smsTemplatesApi
