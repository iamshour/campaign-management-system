//#region Import
import type { GetListReturnType, PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { DateRange } from "@/ui"

import type { Contact, ContactFilter, ContactSearchFilter, GetContactsParams } from "../contacts/types"
//#endregion

/**
 * Fetched Group Type
 */
export interface Group {
	contactsCount: number
	createdAt: string
	description: string
	groupId: string
	groupName: string
}

/**
 * Filters used in Filters bar, as well as in params and body request of some api calls (`getGroups`)
 */
export type ContactGroupFilter = DateRange

type ContactGroupSearchFilter = { any?: true; name?: string }

/**
 * Params passed to the `getGroupsQuery` query, used for fetching Groups List
 */
export type GetGroupsParams = PaginationAndSorting<Group> & ContactGroupFilter & ContactGroupSearchFilter

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
export type GetGroupByIdParams = GetContactsParams & { groupId: string }

/**
 * Body Arguments passed to the `createGroup` query, used for creating a new group
 */
export type CreateGroupBody = {
	description?: string
	name: string
}

/**
 * Body Arguments passed to the `editGroup` mutation, used for editing a Group
 */
export type EditGroupBody = CreateGroupBody & { groupId: string }

/**
 * Body Arguments passed to the `addContactsToGroup` mutation, used for adding contact/s to groups
 */
export type AddContactsToGroupBody = {
	contactFilter?: ContactFilter
	contactGroupsIds: string[]
	contactSearchFilter?: ContactSearchFilter
	contactsIds?: string[]
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
	contactFilter?: ContactFilter
	contactSearchFilter?: ContactSearchFilter
	contactsIds?: string[]
	fromGroupId: string
	moveAndDelete: boolean
	toGroupId: string
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
