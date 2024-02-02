//#region Import
import { parsePhoneNumber } from "@/ui"
import { createObjtWithCommonValue, getListOfKey, cleanObject } from "@/utils"

import type { FiltersFields } from "@/core/slices/advanced-table-slice"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"

import type { ContactFilters } from "./types"
//#endregion

/**
 * Adds a leading '+' to a phone number if it's missing.
 * @param phoneNumber The phone number to add the leading '+' to.
 * @returns The phone number with a leading '+' if it didn't have one, or undefined if phoneNumber was falsy.
 */
export function addLeadingPlusToPhoneNumber<T extends string | undefined>(phoneNumber: T): string | undefined {
	if (!phoneNumber) return undefined

	if (!phoneNumber.startsWith("+")) return `+${phoneNumber}`

	return phoneNumber
}

export type ParsedPhoneNumberDto = Record<"countryCode" | "nationalNumber", string>

/**
 * Used to parse phone number, by accepting a stringified phone number, and returning object of `countryCode` and `nationalNumber` values
 * @param phoneNumber
 * @returns Parsed phone number, containing: `countryCode` and `nationalNumber` values. @template ParsedPhoneNumberDto
 */
export const parsePhoneNumberDto = (phoneNumber: string | undefined): ParsedPhoneNumberDto | undefined => {
	if (!phoneNumber) return

	// Handles Adding Leading code (+) to phone number in order to be parsed by the `parsePhoneNumber` method from 'libphonenumber'
	const phoneNumberWithLeadingCode = addLeadingPlusToPhoneNumber(phoneNumber)

	if (!phoneNumberWithLeadingCode) return

	const parsedNumber = parsePhoneNumber(phoneNumberWithLeadingCode)

	if (!parsedNumber) return

	// Statically inferring types of `countryCode` and `nationalNumber` simce currently unable to get Types properly from `react-phone-input` library
	return {
		countryCode: parsedNumber?.countryCallingCode as any,
		nationalNumber: parsedNumber?.nationalNumber as any,
	}
}

/**
 * Quick Utility function used to return an object of Contact search Filter
 * To match current Backend procedure of searching for a contact.
 * ex: ```
 * 		const searchFilter = {
 * 			firstName: searchTerm
 * 			lastame: searchTerm,
 * 			email: seacrchTerm,
 * 			// rest...
 * 		}
 *
 * @param searchTerm String representing search term from user's input
 * @returns
 */
export const getContactSearchFilter = (searchTerm?: string): ContactFilters["contactSearchFilter"] | undefined => {
	if (!searchTerm) return

	const searchFilter = createObjtWithCommonValue(
		["firstName", "lastName", "email", "phoneNumber", "tag"] as (keyof ContactFilters["contactSearchFilter"])[],
		searchTerm
	)

	return searchFilter
}

/**
 * Quick Utility function used to return an object of Contact Filter and Contact search Filter
 * To match current Backend procedure of filtering and searching for a contact.
 * ex: ```
 *
 * 		const contactFilterAndSearch = {
 *			contactFilter:{
 *				tags: tags[]
 *				groups: groups[],
 *				startDate: date string,
 *				endDate: date string,
 *			},
 *			contactSearchFilter: {
 *				firstName: searchTerm
 *				lastame: searchTerm,
 *				email: seacrchTerm,
 *				// rest...
 *			}
 *		}
 *
 * @param filters String representing the filters applied by user
 * @param searchTerm String representing search term from user's input
 * @returns
 */
export const getContactFilterAndContactSearchFilter = (
	filters?: FiltersFields,
	searchTerm?: string
): Omit<ContactFilters, "contactsIds" | "contactAdvancedFilter"> => {
	return {
		contactFilter: {
			tags: filters?.tags,
			groups: getListOfKey(filters?.groups, "value"),
			// Using below utility Function so that we won't send either date range values if any one is undefined
			// eslint-disable-next-line
			// @ts-ignore
			startDate: getValueFromSafeObject("startDate", filters?.dateRange),
			// eslint-disable-next-line
			// @ts-ignore
			endDate: getValueFromSafeObject("endDate", filters?.dateRange),
		},
		contactSearchFilter: getContactSearchFilter(searchTerm),
	}
}

/**
 * TODO: ADD JSDOC...
 * @param
 * @returns
 */
export const getContactAdvancedFilter = (
	advancedFilters?: FiltersFields["advancedFilters"]
): ContactFilters["contactAdvancedFilter"] | undefined => {
	if (!advancedFilters) return {}

	// Case 1: No Conditions Applied
	if (!advancedFilters?.conditions || advancedFilters?.conditions?.length === 0) {
		return {}
	}

	// Case 2: Custom Conditions Applied
	if (!advancedFilters?.segment) {
		const appliedConditions = advancedFilters?.conditions.map(({ rules }) => ({
			rules: rules.map((rule) =>
				cleanObject({
					...rule,
					groupId: rule.group?.value,
					contactSegmentId: rule?.segment?.value,
				})
			),
		}))

		return {
			conditions: JSON.stringify(appliedConditions),
		}
	}

	// Case 3: Segment Selection Applied
	return {
		segmentId: advancedFilters?.segment.value,
	}
}
