//#region Import
import type { TableState } from "@package/ui/src/table/types"

import type { ListDataReturnType } from "@/core/lib/redux-toolkit/types"

import type { Contact, ContactFilters, GetContactsArgs } from "../contacts/types"
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
 * Arguments used for the `getGroupsQuery` query, passed for the server as params when fetching Groups List
 */
export type GroupsArgs = Omit<TableState<Group>, "selection" | "count"> & {
	name?: string
	startDate?: string
	endDate?: string
}

export interface GroupWithContactsContacts {
	contactGroupDto: {
		id: string
		name: string
	}
	contactResponseList: ListDataReturnType<Contact>
}

export type GroupWithContactsArgs = GetContactsArgs & {
	groupId: string
}

/**
 * Arguments used for the `createGroup` query, passed for the server as params when fetching Groups List
 */
export type CreateGroupArgs = {
	name: string
	description?: string
}

/**
 * Arguments used for the `editGroup` mutation, passed for the server as body when editing a Group
 */
export type EditGroupArgs = CreateGroupArgs & {
	groupId: string
}

/**
 * Arguments passed to the server whilst using the `addContactsToGroup` mutation to add contact/s to groups
 */
export type AddContactsToGroupArgs = Omit<ContactFilters, "contactAdvancedFilter"> & { contactGroupsIds: string[] }

/**
 * Returned data shape from the `addContactsToGroup` mutation
 */
export type AddContactsToGroupReturnType = {
	message: string
	statusCode: string
}

/**
 * Arguments passed to the server whilst using the `moveContactsToGroup` mutation to add contact/s to groups
 */
export type MoveContactsToGroupArgs = Omit<ContactFilters, "contactAdvancedFilter"> & {
	toGroupId: string
	fromGroupId: string
	moveAndDelete: boolean
}

/**
 * Returned data shape from the `moveContactsToGroup` mutation
 */
export type MoveContactsToGroupReturnType = AddContactsToGroupReturnType

/**
 * Arguments passed to the server whilst using the `removeContactsFromGroup` mutation to add contact/s to groups
 */
export type RemoveContactsFromGroupArgs = AddContactsToGroupArgs

/**
 * Returned data shape from the `removeContactsFromGroup` mutation
 */
export type RemoveContactsFromGroupReturnType = AddContactsToGroupReturnType
