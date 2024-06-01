/* eslint-disable perfectionist/sort-objects*/

//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"
import type { TagDescription } from "@reduxjs/toolkit/query"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import { downloadFile } from "@/utils"

import type {
	AddNewContactBody,
	Contact,
	DeleteContactsBody,
	GetContactBytIdReturnType,
	GetContactsParams,
	GetTagsParams,
	ImportFileMappingBody,
	ImportFileMappingReturnType,
	Tag,
	UpdateContactBody,
	UpdateMultipleContactsBody,
	UploadContactsMutationReturnType,
} from "./types"
//#endregion

const contactsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getContacts: builder.query<GetListReturnType<Contact>, GetContactsParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"Contact"
				),
			query: (params) => ({ params, url: "/contact" }),
			transformResponse,
		}),

		getContactById: builder.query<GetContactBytIdReturnType, string>({
			providesTags: (result) => [{ id: result?.id, type: "Contact" }],
			query: (id) => `/contact/${id}`,
			transformResponse,
		}),

		getTags: builder.query<GetListReturnType<Tag>, GetTagsParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ name }) => name),
					"Tag"
				),
			query: (params) => ({ params, url: "/contact/tag" }),
			transformResponse,
		}),

		addNewContact: builder.mutation<any, AddNewContactBody>({
			invalidatesTags: (res) => {
				return res
					? [
							{ id: "LIST", type: "Contact" },
							{ id: "LIST", type: "Tag" },
						]
					: []
			},
			query: (body) => ({ body, method: "POST", url: "/contact" }),
		}),

		updateContact: builder.mutation<any, UpdateContactBody>({
			invalidatesTags: (res, error, { groups, id }) => {
				if (!res) return []

				const revalidationList: TagDescription<"Contact" | "Tag">[] = [
					{ id, type: "Contact" },
					{ id, type: "Tag" },
				]

				if (groups?.length)
					return [
						...revalidationList,
						...groups.map((id: string) => ({ id, type: "Group" }) as TagDescription<"Group">),
					]

				return revalidationList
			},
			query: ({ id, ...body }) => ({ body, method: "PUT", url: `/contact/${id}` }),
		}),

		updateMultipleContacts: builder.mutation<any, UpdateMultipleContactsBody>({
			invalidatesTags: (res, error, { contactsIds, groups, tags }) => {
				if (!res) return []

				let revalidationList: TagDescription<"Contact" | "Group" | "Segment" | "Tag">[] = []

				if (groups?.length) {
					revalidationList = [
						...revalidationList,
						...groups.map((id: string) => ({ id, type: "Group" }) as TagDescription<"Group">),
					]
				} else if (tags?.length) {
					revalidationList = [...revalidationList, { id: "LIST", type: "Tag" }]
				}

				if (contactsIds?.length) {
					revalidationList = [
						...revalidationList,
						...contactsIds.map((id: string) => ({ id, type: "Contact" }) as TagDescription<"Contact">),
					]
				} else {
					// In case of having an empty contactIds, we should invalidate all contacts
					revalidationList = [...revalidationList, "Contact"]
				}

				return revalidationList
			},
			query: (body) => ({ body, method: "PATCH", url: "/contact" }),
		}),

		deleteContacts: builder.mutation<any, DeleteContactsBody>({
			invalidatesTags: (res) =>
				res
					? [
							{ id: "LIST", type: "Contact" },
							{ id: "LIST", type: "Group" },
							{ id: "LIST", type: "Tag" },
						]
					: [],
			query: (body) => ({ body, method: "POST", url: "/contact/delete" }),
		}),

		// Importing Contacts By File
		// Step - 1
		uploadContactsContentData: builder.mutation<UploadContactsMutationReturnType, FormData>({
			query: (body) => ({ body, method: "POST", url: "/contact/upload" }),
			transformResponse,
		}),
		// Step - 2
		importFileMapping: builder.mutation<ImportFileMappingReturnType, ImportFileMappingBody>({
			query: (body) => ({ body, method: "POST", url: "/contact/import/validate" }),
			transformResponse,
		}),
		// Step - 3
		getInvalidContactsFile: builder.mutation<string, string>({
			query: (fileName) => ({
				cache: "no-cache",
				method: "GET",
				responseHandler: async (response: Response) => {
					if (response?.status == 200) downloadFile(fileName, await response.blob())

					return response
				},
				url: `/contact/import/validate/invalid-contacts/${fileName}`,
			}),
			transformResponse,
		}),
		// Step - 4
		submitImportContacts: builder.mutation<ImportFileMappingReturnType, ImportFileMappingBody>({
			invalidatesTags: (res) =>
				res
					? [
							{ id: "LIST", type: "Contact" },
							{ id: "LIST", type: "Tag" },
						]
					: [],
			query: (body) => ({ body, method: "POST", url: "/contact/import" }),
		}),
	}),
})

export const {
	useAddNewContactMutation,
	useDeleteContactsMutation,
	useGetContactByIdQuery,
	useGetContactsQuery,
	useGetInvalidContactsFileMutation,
	useGetTagsQuery,
	useImportFileMappingMutation,
	useSubmitImportContactsMutation,
	useUpdateContactMutation,
	useUpdateMultipleContactsMutation,
	useUploadContactsContentDataMutation,
} = contactsApi
