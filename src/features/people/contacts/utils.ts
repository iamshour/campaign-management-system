//#region Import
import getSearchFilter from "@/core/utils/get-search-filter"
import { cleanObject, getListOfKey } from "@/utils"
import { parsePhoneNumber } from "react-phone-number-input"

import type {
	ContactAdvancedFilter,
	ContactFilter,
	ContactSearchFilter,
	ContactTableAdvancedFiltersType,
	ContactTableFiltersType,
} from "./types"
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

export const getContactFilter = (
	filters?: ContactTableFiltersType,
	extraFilters?: Partial<ContactFilter>
): ContactFilter | undefined => ({
	...filters,
	groups: getListOfKey(filters?.groups, "value"),
	...extraFilters,
})

export const getContactSearchFilter = (searchTerm: string | undefined): ContactSearchFilter | undefined => {
	return getSearchFilter(searchTerm, ["firstName", "lastName", "email", "phoneNumber", "tag"])
}

/**
 * This function is used to generate advance filters body used in fetching contacts list and in
 * multi contacts actions (delete multiple, export multiple, edit multiple)
 *
 * @param advancedFilters object containing advanced filters applied by the user
 * @param asString boolean specificying whether conditions list should be returned as object or stringified
 * 		"asString" is passed as true when fetching list of contacts where we need to send conditions as url params
 *
 * @returns formatted object to be sent to backend, this object may contain either segmentId or conditions list
 */
export const getContactAdvancedFilter = (
	advancedFilters?: ContactTableAdvancedFiltersType["advancedFilters"],
	asString: boolean = false
): ContactAdvancedFilter | undefined => {
	if (!advancedFilters) return {}

	// Case 1: No Conditions Applied
	if (!advancedFilters?.conditions || advancedFilters?.conditions?.length === 0) return {}

	// Case 2: Custom Conditions Applied
	if (!advancedFilters?.segment) {
		const appliedConditions = advancedFilters?.conditions.map(({ rules }) => ({
			contactSegmentRuleList: rules.map((rule) =>
				cleanObject({
					contactSegmentId: rule.segment?.value,
					contactSegmentRuleAttribute: rule.attribute,
					contactSegmentRuleCondition: rule.condition,
					country: rule.country,
					groupId: rule.group?.value,
					specification: rule.specification,
				})
			),
		}))

		return {
			contactSegmentConditionList: asString ? JSON.stringify(appliedConditions) : appliedConditions,
		}
	}

	// Case 3: Segment Selection Applied
	return {
		segmentId: advancedFilters?.segment.value,
	}
}
