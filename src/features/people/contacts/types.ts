//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { DateRange, OptionType } from "@/ui"

import { SegmentConditionType } from "../segments/types"

import type { ParsedPhoneNumberDto } from "./utils"
//#endregion

/**
 * Fetched Tag entry type (Fetched from `getTagsList` query)
 */
export type Tag = { name: string }

/**
 * Fetched Contact Type
 */
export type Contact = {
	id: string
	firstName?: string
	lastName?: string
	phoneNumber?: string
	email?: string
	tags?: string[]
	groups?: string[]
	country?: string
	createdAt?: string
	updatedAt?: string
	note?: string
}

/**
 * Filters used in Filters bar (Internally / Only Client-Side - Not sent to the server)
 */
export type ContactTableFiltersType = {
	dateRange?: DateRange
	tags?: string[]
	groups?: OptionType[]
}

/**
 * Filters used in Advanced filters dialog (Internally / Only Client-Side - Not sent to the server)
 */
export type ContactTableAdvancedFiltersType = {
	advancedFilters?: { segment?: OptionType; conditions: SegmentConditionType[] }
}

/**
 * Contact filters, sent to server
 * Used when fetching contacts list and when updating/deleting multiple contacts
 */
export type ContactFilter = DateRange & Pick<Contact, "tags" | "groups"> & { excludedGroupsList?: string[] }

/**
 * Contact search filters, sent to server
 * Used when fetching contacts list and when updating/deleting multiple contacts
 */
export type ContactSearchFilter = Partial<Pick<Contact, "firstName" | "lastName" | "email" | "phoneNumber">> & {
	tag?: string
	any?: boolean
}

/**
 * Contact advanced filters, sent to server
 * Used when fetching contacts list and when updating/deleting multiple contacts
 */
export type ContactAdvancedFilter = { segmentId?: string } | { contactSegmentConditionList?: string }

/**
 * Params passed to the `getContactsQuery` query, used to fetch Contacts List
 */
export type GetContactsParams = PaginationAndSorting<Contact> &
	ContactFilter &
	ContactSearchFilter &
	ContactAdvancedFilter

/**
 * Body Arguments passed to the `addNewContact` mutation, used to post a new contact entry
 */
export type AddNewContactBody = Omit<Contact, "id" | "phoneNumber" | "createdAt" | "updatedAt"> & {
	branchId?: string
	phoneNumberDto?: ParsedPhoneNumberDto
}

/**
 * Body Arguments passed to the `updateContact` mutation, used to update an existing contact entry
 */
export type UpdateContactBody = AddNewContactBody & { id: string }

/**
 * Returned response shape after calling the `getContactById` query
 */
export type GetContactBytIdReturnType = Omit<Contact, "groups"> & {
	branchId?: string
	groups?: Record<"name" | "id", string>[]
}

/**
 * Params passed to the `getTags` query, used to fetch Tags List
 */
export type GetTagsParams = PaginationAndSorting<string> & { name?: string }

/**
 * Body Arguments passed to the `updateMultipleContacts` mutation, used to update multiple contacts
 */
export type UpdateMultipleContactsBody = {
	addToContact: boolean
	tags?: string[]
	groups?: string[]
	contactsIds?: string[]
	contactFilter?: ContactFilter
	contactSearchFilter?: ContactSearchFilter
	contactAdvancedFilter?: ContactAdvancedFilter
}

/**
 * Body Arguments passed to the `deleteContacts` mutation, used to delete contacts
 */
export type DeleteContactsBody = {
	contactsIds?: string[]
	contactFilter?: ContactFilter
	contactSearchFilter?: ContactSearchFilter
	contactAdvancedFilter?: ContactAdvancedFilter
}

/**
 * Returned response shape after calling the `uploadContactsMutation` mutation function, which runs when users uploads a file
 */
export type UploadContactsMutationReturnType = {
	/**
	 * File of which the data should be retrieved from
	 */
	fileName: string

	/**
	 * List of Comma seperated Rows. Example: ["Ali Shour, Lebanon, 0096171230387", "Rawad Kassir, USA, 00923214244"]
	 */
	previewRows: string[]
}

export type ContactScreamSnakeCaseKey = "FIRST_NAME" | "LAST_NAME" | "EMAIL" | "PHONE_NUMBER" | "NOTE"

/**
 * Body Arguments passed to the `importFileMapping` mutation, used to import File mapping by user
 */
export type ImportFileMappingBody = {
	/**
	 * File of which the data should be retrieved from
	 */
	fileName: string

	/**
	 * Represents either the uploaded file has header or not.
	 */
	fileHasHeader: boolean

	/**
	 * List of Selected Tags to be added for imported contacts
	 */
	tags?: string[]

	/**
	 * List of Selected Groups to be added for imported contacts
	 */
	groups?: string[]

	/**
	 * A map contains the column name with the related column number in the uploaded file.
	 */
	columnNameToIndexMapping: Partial<Record<ContactScreamSnakeCaseKey, number>>
}

/**
 * Returned response shape after calling the `importFileMapping` mutation function, which runs when users uploads file mapping (submission of 2nd step in import contact dialog)
 */
export type ImportFileMappingReturnType = {
	/**
	 * Total number of successfully validated contacts.
	 */
	totalSuccessCount: number
	/**
	 * Total number of failed validations (includes both invalid and already exist contacts).
	 */
	totalFailedCount: number
	/**
	 * Number of failed validations specifically related to invalid contacts.
	 * This count is included in the total failed count.
	 */
	invalidContactsFailedCount: number
	/**
	 * Map containing the count of contacts that already exist for each Contact identifier key.
	 */
	alreadyExistMap: Partial<Record<ContactScreamSnakeCaseKey, number>>
	/**
	 * Map containing the count of contacts for each country.
	 */
	countryCountMap: Record<string, number>
	/**
	 * File name of invalid contact csv file to export.
	 */
	invalidContactsExportFileName: string
}
