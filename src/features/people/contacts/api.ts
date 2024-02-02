//#region Import
import type { TagDescription } from "@reduxjs/toolkit/query"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import type { ListDataReturnType } from "@/core/lib/redux-toolkit/types"
import { downloadFile } from "@/utils"

import type {
	Contact,
	GetContactBytIdReturnType,
	GetContactsArgs,
	AddNewContactArgs,
	Tag,
	GetTagsListArgs,
	ContactFilters,
	UpdateMultipleContactsArgs,
	ImportFileMappingArgs,
	ImportFileMappingReturnType,
	UploadContactsMutationReturnType,
} from "./types"
//#endregion

const contactsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getContacts: builder.query<ListDataReturnType<Contact>, GetContactsArgs>({
			query: (params) => ({ url: "/contact", params }),
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"Contact"
				),
			transformResponse,
		}),

		getContactById: builder.query<GetContactBytIdReturnType, string>({
			query: (id) => `/contact/${id}`,
			providesTags: (result) => [{ type: "Contact", id: result?.id }],
			transformResponse,
		}),

		getTagsList: builder.query<ListDataReturnType<Tag>, GetTagsListArgs>({
			query: (params) => ({ url: "/contact/tag", params }),
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ name }) => name),
					"Tag"
				),
			transformResponse,
		}),

		addNewContact: builder.mutation<any, AddNewContactArgs>({
			query: (body) => ({ url: "/contact", method: "POST", body }),
			invalidatesTags: (res) => (res ? [{ type: "Contact", id: "LIST" }] : []),
		}),

		updateContact: builder.mutation<any, AddNewContactArgs & { id: string }>({
			query: ({ id, ...body }) => ({ url: `/contact/${id}`, method: "PUT", body }),
			invalidatesTags: (res, error, { id, groups }) => {
				if (!res) return []

				const revalidatedContact: TagDescription<"Contact"> = { type: "Contact", id }

				if (groups?.length)
					return [revalidatedContact, ...groups.map((id: string) => ({ type: "Group", id }) as TagDescription<"Group">)]

				return [revalidatedContact]
			},
		}),

		updateMultipleContacts: builder.mutation<any, UpdateMultipleContactsArgs>({
			query: (body) => ({ url: "/contact", method: "PATCH", body }),
			invalidatesTags: (res, error, { contactsIds, tags, groups }) => {
				if (!res) return []

				let revalidationList: TagDescription<"Contact" | "Tag" | "Group" | "Segment">[] = []

				if (groups?.length) {
					revalidationList = [
						...revalidationList,
						...groups.map((id: string) => ({ type: "Group", id }) as TagDescription<"Group">),
					]
				} else if (tags?.length) {
					// TODO: In case of newly created tag, check if we need to pass [{ type: "Tag", id: "LIST" }] instead
					revalidationList = [
						...revalidationList,
						...tags.map((id: string) => ({ type: "Tag", id }) as TagDescription<"Tag">),
					]
				}

				if (contactsIds?.length) {
					revalidationList = [
						...revalidationList,
						...contactsIds.map((id: string) => ({ type: "Contact", id }) as TagDescription<"Contact">),
					]
				} else {
					console.log("Logged From: NO CONTACT IDS SELECTED")
					// In case of having an empty contactIds, we should invalidate all contacts
					revalidationList = [...revalidationList, "Contact"]
				}

				return revalidationList
			},
		}),

		deleteContacts: builder.mutation<any, ContactFilters>({
			query: (body) => ({ url: "/contact/delete", method: "POST", body }),
			invalidatesTags: (res) =>
				res
					? [
							{ type: "Contact", id: "LIST" },
							{ type: "Group", id: "LIST" },
						]
					: [],
		}),

		uploadContactsContentData: builder.mutation<UploadContactsMutationReturnType, FormData>({
			query: (body) => ({ url: "/contact/upload", method: "POST", body }),
			transformResponse,
		}),

		importFileMapping: builder.mutation<ImportFileMappingReturnType, ImportFileMappingArgs>({
			query: (body) => ({ url: "/contact/import/validate", method: "POST", body }),
			transformResponse,
		}),

		getInvalidContactsFile: builder.mutation<string, string>({
			query: (fileName) => ({
				url: `/contact/import/validate/invalid-contacts/${fileName}`,
				method: "GET",
				responseHandler: async (response: Response) => {
					if (response?.status == 200) {
						downloadFile(fileName, await response.blob())
					}

					return response
				},
				cache: "no-cache",
			}),
			transformResponse,
		}),

		submitImportContacts: builder.mutation<ImportFileMappingReturnType, ImportFileMappingArgs>({
			query: (body) => ({ url: "/contact/import", method: "POST", body }),
			transformResponse,
			invalidatesTags: (res) => (res ? [{ type: "Contact", id: "LIST" }] : []),
		}),
	}),
})

export const {
	useGetContactsQuery,
	useGetContactByIdQuery,
	useGetTagsListQuery,
	useAddNewContactMutation,
	useUpdateContactMutation,
	useUpdateMultipleContactsMutation,
	useDeleteContactsMutation,
	useUploadContactsContentDataMutation,
	useImportFileMappingMutation,
	useGetInvalidContactsFileMutation,
	useSubmitImportContactsMutation,
} = contactsApi
