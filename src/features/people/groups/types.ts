//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"
import type { TableState } from "@/ui"

import type { Contact, ContactFilter, ContactSearchFilter, GetContactsParams } from "../contacts/types"
//#endregion

/**
 * Fetched Group Type
 */
export interface Group {
	groupId: string
	groupName: string
	description: string
	createdAt: string
	contactsCount: number
}

/**
 * Params passed to the `getGroupsQuery` query, used for fetching Groups List
 */
export type GetGroupsParams = Omit<TableState<Group>, "selection"> & {
	name?: string
	startDate?: string
	endDate?: string
}

/**
 * Returned response shape after calling the `getGroupById` query
 */
export type GetGroupByIdReturnType = {
	contactGroupDto: Record<"id" | "name", string>
	contactResponseList: GetListReturnType<Contact>
}

/**
 * Params passed to the `getGroupByIdQuery` query, used for fetching single group by ID
 */
export type GetGroupByIdParams = GetContactsParams & {
	groupId: string
}

/**
 * Body Arguments passed to the `createGroup` query, used for creating a new group
 */
export type CreateGroupBody = {
	name: string
	description?: string
}

/**
 * Body Arguments passed to the `editGroup` mutation, used for editing a Group
 */
export type EditGroupBody = CreateGroupBody & { groupId: string }

/**
 * Body Arguments passed to the `addContactsToGroup` mutation, used for adding contact/s to groups
 */
export type AddContactsToGroupBody = {
	contactsIds?: string[]
	contactFilter?: ContactFilter
	contactSearchFilter?: ContactSearchFilter
	contactGroupsIds: string[]
}

/**
 * Returned response shape after calling the `addContactsToGroup` mutation
 */
export type AddContactsToGroupReturnType = {
	message: string
	statusCode: string
}

/**
 * Body Arguments passed to the `moveContactsToGroup` mutation, used to move contact/s from a group to one or more groups
 */
export type MoveContactsToGroupBody = {
	contactsIds?: string[]
	contactFilter?: ContactFilter
	contactSearchFilter?: ContactSearchFilter
	toGroupId: string
	fromGroupId: string
	moveAndDelete: boolean
}

/**
 * Returned response shape after calling the `moveContactsToGroup` mutation
 */
export type MoveContactsToGroupReturnType = AddContactsToGroupReturnType

/**
 * Body Arguments passed to the `removeContactsFromGroup` mutation, used to remove contact/s from group/s
 */
export type RemoveContactsFromGroupBody = AddContactsToGroupBody

/**
 * Returned response shape after calling the `removeContactsFromGroup` mutation
 */
export type RemoveContactsFromGroupReturnType = AddContactsToGroupReturnType
