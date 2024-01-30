//#region Import
import type { TagDescription } from "@reduxjs/toolkit/query"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import type { ListDataReturnType } from "@/core/lib/redux-toolkit/types"

import type {
	Group,
	GroupsArgs,
	GroupWithContactsContacts,
	GroupWithContactsArgs,
	CreateGroupArgs,
	EditGroupArgs,
	AddContactsToGroupArgs,
	AddContactsToGroupReturnType,
	MoveContactsToGroupArgs,
	MoveContactsToGroupReturnType,
	RemoveContactsFromGroupArgs,
	RemoveContactsFromGroupReturnType,
} from "./types"
//#endregion

const groupsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getGroups: builder.query<ListDataReturnType<Group>, GroupsArgs>({
			query: (params) => ({ url: "/contact/group", params }),
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ groupId }) => groupId),
					"Group"
				),
			transformResponse,
		}),

		getGroupById: builder.query<GroupWithContactsContacts, GroupWithContactsArgs>({
			query: ({ groupId, ...params }) => ({ url: `/contact/group/${groupId}`, params }),
			providesTags: (result) => [{ type: "Group", id: result?.contactGroupDto?.id }],
			transformResponse,
		}),

		createGroup: builder.mutation<Pick<Group, "groupName" | "groupId" | "description">, CreateGroupArgs>({
			query: (body) => ({ url: "/contact/group", method: "POST", body }),
			invalidatesTags: (response) => (response ? [{ type: "Group", id: "LIST" }] : []),
			transformResponse,
		}),

		editGroup: builder.mutation<any, EditGroupArgs>({
			query: ({ groupId, ...body }) => ({ url: `/contact/group/${groupId}`, method: "PATCH", body }),
			invalidatesTags: (response) => (response ? [{ type: "Group", id: "LIST" }] : []),
		}),

		deleteGroup: builder.mutation<any, string>({
			query: (groupId) => ({ url: `/contact/group/${groupId}`, method: "DELETE" }),
			invalidatesTags: (response) => (response ? [{ type: "Group", id: "LIST" }] : []),
		}),

		addContactsToGroup: builder.mutation<AddContactsToGroupReturnType, AddContactsToGroupArgs>({
			query: (body) => ({ url: "/contact/group/add", method: "POST", body }),
			invalidatesTags: (res, error, { contactGroupsIds, contactsIds }) => {
				if (!res) return []

				const revalidatedGroupsList: TagDescription<"Group">[] = contactGroupsIds.map((id: string) => ({
					type: "Group",
					id,
				}))

				if (contactsIds?.length) {
					const revalidatedContactsList: TagDescription<"Contact">[] = contactsIds.map((id: string) => ({
						type: "Contact",
						id,
					}))

					return [...revalidatedGroupsList, ...revalidatedContactsList]
				}

				// In case of having an empty contactIds, we should invalidate all contacts
				return [...revalidatedGroupsList, "Contact"]
			},
		}),

		moveContactsToGroup: builder.mutation<MoveContactsToGroupReturnType, MoveContactsToGroupArgs>({
			query: (body) => ({ url: "/contact/group/move", method: "POST", body }),
			invalidatesTags: (res, error, { fromGroupId, toGroupId, contactsIds }) => {
				if (!res) return []

				const revalidatedGroupsList: TagDescription<"Group">[] = [
					{ type: "Group", id: fromGroupId },
					{ type: "Group", id: toGroupId },
				]

				if (contactsIds?.length) {
					const revalidatedContactsList: TagDescription<"Contact">[] = contactsIds.map((id: string) => ({
						type: "Contact",
						id,
					}))

					return [...revalidatedGroupsList, ...revalidatedContactsList]
				}

				// In case of having an empty contactIds, we should invalidate all contacts
				return [...revalidatedGroupsList, "Contact"]
			},
		}),

		removeContactsFromGroup: builder.mutation<RemoveContactsFromGroupReturnType, RemoveContactsFromGroupArgs>({
			query: (body) => ({ url: "/contact/group/remove", method: "POST", body: body }),
			invalidatesTags: (res, error, { contactGroupsIds, contactsIds }) => {
				if (!res) return []

				const revalidatedGroupsList: TagDescription<"Group">[] = contactGroupsIds.map((id: string) => ({
					type: "Group",
					id,
				}))

				if (contactsIds?.length) {
					const revalidatedContactsList: TagDescription<"Contact">[] = contactsIds.map((id: string) => ({
						type: "Contact",
						id,
					}))

					return [...revalidatedGroupsList, ...revalidatedContactsList]
				}

				// In case of having an empty contactIds, we should invalidate all contacts
				return [...revalidatedGroupsList, "Contact"]
			},
		}),
	}),
})

export const {
	useGetGroupsQuery,
	useGetGroupByIdQuery,
	useCreateGroupMutation,
	useEditGroupMutation,
	useDeleteGroupMutation,
	useAddContactsToGroupMutation,
	useMoveContactsToGroupMutation,
	useRemoveContactsFromGroupMutation,
} = groupsApi
