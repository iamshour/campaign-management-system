//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import api from "@/core/lib/redux-toolkit/api"
import { transformResponse } from "@/core/lib/redux-toolkit/helpers"
import { downloadFile } from "@/utils"

import type { ContactExports, DownloadExportParams, GetExportsParams, SubmitExportsFileBody } from "./types"
//#endregion

const exportsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		deleteExport: builder.mutation<any, string>({
			query: (id) => ({
				method: "DELETE",
				responseHandler: (response: Response) => response,
				url: `/contact/export/${id}`,
			}),
		}),

		downloadExport: builder.mutation<any, DownloadExportParams>({
			query: ({ fileName, id }) => ({
				cache: "no-cache",
				method: "GET",
				responseHandler: async (response: Response) => {
					if (response?.status == 200) downloadFile(fileName, await response.blob())

					return response
				},
				url: `/contact/export/download?id=${id}`,
			}),
		}),

		getExports: builder.query<GetListReturnType<ContactExports>, GetExportsParams>({
			query: (params) => ({ params, url: "/contact/export" }),
			transformResponse,
		}),

		submitExportsFile: builder.mutation<{ id: string }, SubmitExportsFileBody>({
			query: (body) => ({ body, method: "POST", url: "/contact/export" }),
			transformResponse,
		}),
	}),
})

export const { useDeleteExportMutation, useDownloadExportMutation, useGetExportsQuery, useSubmitExportsFileMutation } =
	exportsApi
