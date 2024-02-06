//#region Import
import type { CommonListArguments } from "@/core/lib/redux-toolkit/types"
import type { DateRange, OptionType } from "@/ui"

import type { ParsedPhoneNumberDto } from "./utils"
//#endregion

/**
 * Fetched Tag entry type (Fetched from `getTagsList` query)
 */
export type Tag = {
	// Currently Returned from server, but not needed at all
	// id: null
	// count: number

	name: string
}

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
 * Filters Sent to the server, using any Fetch Contacts Endpoint
 */
export type ContactFilters = {
	/**
	 * List of contact Ids. Could be empty if no entries are selected, meaning that filtering would be applied on other additional filters
	 */
	contactsIds?: string[]

	/**
	 * Current filters used to filter contacts list. Includes: Tags[], groups[], excludedGroupsList[], and DateRange
	 */
	contactFilter?: DateRange & Pick<Contact, "tags" | "groups"> & { excludedGroupsList?: string[] }

	/**
	 * Object of contact fields that mapped with the `searchTerm` value for each one (currently they share same `searchTerm` value)
	 */
	contactSearchFilter?: Partial<Pick<Contact, "firstName" | "lastName" | "email" | "phoneNumber">> & {
		tag?: string
		any?: boolean
	}

	contactAdvancedFilter?: { segmentId?: string } | { conditions?: string }
}

/**
 * Arguments passed to the server whilst using the `getContactsQuery` query to fetch Contacts List
 */
export type GetContactsArgs = CommonListArguments<Contact> & {
	excludedGroupsList?: string[]
	tags?: string[]
	groups?: string[]
	segmentId?: string
} & ContactFilters["contactSearchFilter"]

/**
 * Arguments passed to the server whilst using the `addNewContact` mutation to post a new contact entry
 */
export type AddNewContactArgs = Omit<Contact, "id" | "phoneNumber" | "createdAt" | "updatedAt"> & {
	branchId?: string
	phoneNumberDto?: ParsedPhoneNumberDto
}

/**
 * Returned data shape from the `getContactById` query
 */
export type GetContactBytIdReturnType = Omit<Contact, "groups"> & {
	branchId?: string
	groups?: Record<"name" | "id", string>[]
}

/**
 * Arguments passed to the server whilst using the `getTagsList` query to fetch Tags List
 */
export type GetTagsListArgs = CommonListArguments<string> & { name?: string }

/**
 * Arguments passed to the server whilst using the `updateMultipleContacts` mutation to update multiple contacts
 */
export type UpdateMultipleContactsArgs = (ContactFilters & { addToContact: boolean }) & {
	tags?: string[]
	groups?: string[]
}

/**
 * Returned data shape from the `uploadContactsMutation` mutation function, which runs when users uploads a file
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
 * Arguments passed to the server whilst using the `importFileMapping` mutation to import File mapping by user
 */
export type ImportFileMappingArgs = {
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
