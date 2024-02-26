//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { DateRange, OptionType } from "@/ui"

import type { SegmentConditionType } from "../segments/types"
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
	country?: string
	createdAt?: string
	email?: string
	firstName?: string
	groups?: string[]
	id: string
	lastName?: string
	note?: string
	phoneNumber?: string
	tags?: string[]
	updatedAt?: string
}

/**
 * Filters used in Filters bar (Internally / Only Client-Side - Not sent to the server)
 */
export type ContactTableFiltersType = DateRange & {
	groups?: OptionType[]
	tags?: string[]
}

/**
 * Filters used in Advanced filters dialog (Internally / Only Client-Side - Not sent to the server)
 */
export type ContactTableAdvancedFiltersType = {
	advancedFilters?: { conditions: SegmentConditionType[]; segment?: OptionType }
}

/**
 * Filters used in Filters bar, as well as in params and body request of some api calls (`getContacts`, `deleteContacts`, etc)
 */
export type ContactFilter = DateRange & Pick<Contact, "groups" | "tags"> & { excludedGroupsList?: string[] }

/**
 * Contact search filters, sent to server
 * Used when fetching contacts list and when updating/deleting multiple contacts
 */
export type ContactSearchFilter = Partial<Pick<Contact, "email" | "firstName" | "lastName" | "phoneNumber">> & {
	any?: true
	tag?: string
}

/**
 * Contact advanced filters, sent to server
 * Used when fetching contacts list and when updating/deleting multiple contacts
 */
export type ContactAdvancedFilter = {
	contactSegmentConditionList?:
		| {
				contactSegmentRuleList: {
					contactSegmentId?: string
					contactSegmentRuleAttribute: string
					contactSegmentRuleCondition: string
					country?: string
					groupId?: string
					specification?: string
				}[]
		  }[]
		| string
	segmentId?: string
}

/**
 * Params passed to the `getContactsQuery` query, used to fetch Contacts List
 */
export type GetContactsParams = PaginationAndSorting<Contact> &
	ContactAdvancedFilter &
	ContactFilter &
	ContactSearchFilter

/**
 * Body Arguments passed to the `addNewContact` mutation, used to post a new contact entry
 */
export type AddNewContactBody = Omit<Contact, "createdAt" | "id" | "phoneNumber" | "updatedAt"> & {
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
	groups?: Record<"id" | "name", string>[]
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
	contactAdvancedFilter?: ContactAdvancedFilter
	contactFilter?: ContactFilter
	contactSearchFilter?: ContactSearchFilter
	contactsIds?: string[]
	groups?: string[]
	tags?: string[]
}

/**
 * Body Arguments passed to the `deleteContacts` mutation, used to delete contacts
 */
export type DeleteContactsBody = {
	contactAdvancedFilter?: ContactAdvancedFilter
	contactFilter?: ContactFilter
	contactSearchFilter?: ContactSearchFilter
	contactsIds?: string[]
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

export type ContactScreamSnakeCaseKey = "EMAIL" | "FIRST_NAME" | "LAST_NAME" | "NOTE" | "PHONE_NUMBER"

/**
 * Body Arguments passed to the `importFileMapping` mutation, used to import File mapping by user
 */
export type ImportFileMappingBody = {
	/**
	 * A map contains the column name with the related column number in the uploaded file.
	 */
	columnNameToIndexMapping: Partial<Record<ContactScreamSnakeCaseKey, number>>

	/**
	 * Represents either the uploaded file has header or not.
	 */
	fileHasHeader: boolean

	/**
	 * File of which the data should be retrieved from
	 */
	fileName: string

	/**
	 * List of Selected Groups to be added for imported contacts
	 */
	groups?: string[]

	/**
	 * List of Selected Tags to be added for imported contacts
	 */
	tags?: string[]
}

/**
 * Returned response shape after calling the `importFileMapping` mutation function, which runs when users uploads file mapping (submission of 2nd step in import contact dialog)
 */
export type ImportFileMappingReturnType = {
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
	/**
	 * Number of failed validations specifically related to invalid contacts.
	 * This count is included in the total failed count.
	 */
	invalidContactsFailedCount: number
	/**
	 * Total number of failed validations (includes both invalid and already exist contacts).
	 */
	totalFailedCount: number
	/**
	 * Total number of successfully validated contacts.
	 */
	totalSuccessCount: number
}
