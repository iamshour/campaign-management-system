//#region Import

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"
import { downloadFile } from "@/utils"

import type { ContactExports, DownloadExportParams, GetExportsParams, SubmitExportsFileBody } from "./types"
//#endregion

const exportsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getExports: builder.query<GetListReturnType<ContactExports>, GetExportsParams>({
			query: (params) => ({ url: "/contact/export", params }),
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"Export"
				),
			transformResponse,
		}),

		submitExportsFile: builder.mutation<{ id: string }, SubmitExportsFileBody>({
			query: (body) => ({ url: "/contact/export", method: "POST", body }),
			invalidatesTags: (res) => (res ? [{ type: "Export", id: "LIST" }] : []),
			transformResponse,
		}),

		downloadExport: builder.mutation<any, DownloadExportParams>({
			query: ({ id, fileName }) => ({
				url: `/contact/export/download?id=${id}`,
				method: "GET",
				responseHandler: async (response: Response) => {
					if (response?.status == 200) {
						downloadFile(fileName, await response.blob())
					}

					return response
				},
				cache: "no-cache",
			}),
		}),

		deleteExport: builder.mutation<any, string>({
			query: (id) => ({
				url: `/contact/export/${id}`,
				method: "DELETE",
				responseHandler: (response: Response) => response,
			}),
			invalidatesTags: (res) => (res ? [{ type: "Export", id: "LIST" }] : []),
		}),
	}),
})

export const { useGetExportsQuery, useDownloadExportMutation, useDeleteExportMutation, useSubmitExportsFileMutation } =
	exportsApi
