//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"
import type { TagDescription } from "@reduxjs/toolkit/query"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"

import type {
	AddContactsToGroupBody,
	AddContactsToGroupReturnType,
	CreateGroupBody,
	EditGroupBody,
	GetGroupByIdParams,
	GetGroupByIdReturnType,
	GetGroupsParams,
	Group,
	MoveContactsToGroupBody,
	MoveContactsToGroupReturnType,
	RemoveContactsFromGroupBody,
	RemoveContactsFromGroupReturnType,
} from "./types"
//#endregion

const groupsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		addContactsToGroup: builder.mutation<AddContactsToGroupReturnType, AddContactsToGroupBody>({
			invalidatesTags: (res, error, { contactGroupsIds, contactsIds }) => {
				if (!res) return []

				const revalidatedGroupsList: TagDescription<"Group">[] = contactGroupsIds.map((id: string) => ({
					id,
					type: "Group",
				}))

				if (contactsIds?.length) {
					const revalidatedContactsList: TagDescription<"Contact">[] = contactsIds.map((id: string) => ({
						id,
						type: "Contact",
					}))

					return [...revalidatedGroupsList, ...revalidatedContactsList]
				}

				// In case of having an empty contactIds, we should invalidate all contacts
				return [...revalidatedGroupsList, "Contact"]
			},
			query: (body) => ({ body, method: "POST", url: "/contact/group/add" }),
		}),

		createGroup: builder.mutation<Pick<Group, "description" | "groupId" | "groupName">, CreateGroupBody>({
			invalidatesTags: (response) => (response ? [{ id: "LIST", type: "Group" }] : []),
			query: (body) => ({ body, method: "POST", url: "/contact/group" }),
			transformResponse,
		}),

		deleteGroup: builder.mutation<any, string>({
			invalidatesTags: (response) => (response ? [{ id: "LIST", type: "Group" }] : []),
			query: (groupId) => ({ method: "DELETE", url: `/contact/group/${groupId}` }),
		}),

		editGroup: builder.mutation<any, EditGroupBody>({
			invalidatesTags: (response) => (response ? [{ id: "LIST", type: "Group" }] : []),
			query: ({ groupId, ...body }) => ({ body, method: "PATCH", url: `/contact/group/${groupId}` }),
		}),

		getGroupById: builder.query<GetGroupByIdReturnType, GetGroupByIdParams>({
			providesTags: (result) => [{ id: result?.contactGroupDto?.id, type: "Group" }],
			query: ({ groupId, ...params }) => ({ params, url: `/contact/group/${groupId}` }),
			transformResponse,
		}),

		getGroups: builder.query<GetListReturnType<Group>, GetGroupsParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ groupId }) => groupId),
					"Group"
				),
			query: (params) => ({ params, url: "/contact/group" }),
			transformResponse,
		}),

		moveContactsToGroup: builder.mutation<MoveContactsToGroupReturnType, MoveContactsToGroupBody>({
			invalidatesTags: (res, error, { contactsIds, fromGroupId, toGroupId }) => {
				if (!res) return []

				const revalidatedGroupsList: TagDescription<"Group">[] = [
					{ id: fromGroupId, type: "Group" },
					{ id: toGroupId, type: "Group" },
				]

				if (contactsIds?.length) {
					const revalidatedContactsList: TagDescription<"Contact">[] = contactsIds.map((id: string) => ({
						id,
						type: "Contact",
					}))

					return [...revalidatedGroupsList, ...revalidatedContactsList]
				}

				// In case of having an empty contactIds, we should invalidate all contacts
				return [...revalidatedGroupsList, "Contact"]
			},
			query: (body) => ({ body, method: "POST", url: "/contact/group/move" }),
		}),

		removeContactsFromGroup: builder.mutation<RemoveContactsFromGroupReturnType, RemoveContactsFromGroupBody>({
			invalidatesTags: (res, error, { contactGroupsIds, contactsIds }) => {
				if (!res) return []

				const revalidatedGroupsList: TagDescription<"Group">[] = contactGroupsIds.map((id: string) => ({
					id,
					type: "Group",
				}))

				if (contactsIds?.length) {
					const revalidatedContactsList: TagDescription<"Contact">[] = contactsIds.map((id: string) => ({
						id,
						type: "Contact",
					}))

					return [...revalidatedGroupsList, ...revalidatedContactsList]
				}

				// In case of having an empty contactIds, we should invalidate all contacts
				return [...revalidatedGroupsList, "Contact"]
			},
			query: (body) => ({ body: body, method: "POST", url: "/contact/group/remove" }),
		}),
	}),
})

export const {
	useAddContactsToGroupMutation,
	useCreateGroupMutation,
	useDeleteGroupMutation,
	useEditGroupMutation,
	useGetGroupByIdQuery,
	useGetGroupsQuery,
	useMoveContactsToGroupMutation,
	useRemoveContactsFromGroupMutation,
} = groupsApi
