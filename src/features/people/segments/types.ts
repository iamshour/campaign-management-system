//#region Import
import type { OptionType } from "@/ui"

import type { CommonListArguments } from "@/core/lib/redux-toolkit/types"
//#endregion

export type Segment = {
	id: string
	name: string
	description?: string
	createdAt: string
}

// Same as Backend's enum
export type SegmentRuleAttribute =
	| "FIRST_NAME"
	| "LAST_NAME"
	| "PHONE_NUMBER"
	| "EMAIL_ADDRESS"
	| "COUNTRY"
	| "TAGS"
	| "GROUPS"
	| "SEGMENTS"

// Same as Backend's enum
export type SegmentRuleCondition =
	| "IS"
	| "IS_NOT"
	| "STARTS_WITH"
	| "ENDS_WITH"
	| "CONTAINS"
	| "NOT_CONTAINS"
	| "IS_EMPTY"
	| "IS_NOT_EMPTY"
	| ""

// <----------------------->
// Types used internally for All segments Creation/View/Edit components
export type SegmentRuleType = {
	// Optional since it only exists for editing rules
	id?: string
	attribute: SegmentRuleAttribute
	condition: SegmentRuleCondition
	specification?: string
	country?: string
	group?: OptionType
	segment?: OptionType
}
export type SegmentConditionType = {
	// Optional since it only exists for editing conditions
	id?: string
	rules: SegmentRuleType[]
}
// <----------------------->

/**
 * Arguments passed to the server whilst using the `getSegments` query to fetch Segments List
 */
export type GetSegmentArgs = Omit<CommonListArguments<Segment>, "startDate" | "endDate">

/**
 * Arguments passed to the server whilst using the `createSegment` mutation to post a new created segment entry
 */
export type createSegmentArgsType = Pick<Segment, "name"> &
	Partial<Pick<Segment, "id" | "description">> & {
		contactSegmentConditionList: {
			id?: string
			contactSegmentRuleList: {
				id: string | undefined
				contactSegmentRuleAttribute: SegmentRuleAttribute
				contactSegmentRuleCondition: SegmentRuleCondition
				specification: string | undefined
				country: string | undefined
				groupId: string | undefined
				contactSegmentId: string | undefined
			}[]
		}[]
	}

/**
 * Returned data shape from the `uploadContactsMutation` mutation function, which runs when users uploads a file
 */
export type GetSegmentByIdReturnValue = Pick<Segment, "id" | "name" | "description"> & {
	contactSegmentConditionDetailsList: {
		id: string
		contactSegmentRuleDetailsList: {
			id: string
			contactSegmentRuleAttribute: SegmentRuleAttribute
			contactSegmentRuleCondition: SegmentRuleCondition
			specification?: string
			country?: string
			group: Record<"name" | "id", string>
			contactSegment: Record<"name" | "id", string>
		}[]
	}[]
}
