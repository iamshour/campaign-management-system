//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { DateRange, OptionType } from "@/ui"
//#endregion

export type Segment = {
	createdAt: string
	description?: string
	id: string
	name: string
}

// Same as Backend's enum
export type SegmentRuleAttribute =
	| "COUNTRY"
	| "EMAIL_ADDRESS"
	| "FIRST_NAME"
	| "GROUPS"
	| "LAST_NAME"
	| "PHONE_NUMBER"
	| "SEGMENTS"
	| "TAGS"

// Same as Backend's enum
export type SegmentRuleCondition =
	| ""
	| "CONTAINS"
	| "ENDS_WITH"
	| "IS_EMPTY"
	| "IS_NOT_EMPTY"
	| "IS_NOT"
	| "IS"
	| "NOT_CONTAINS"
	| "STARTS_WITH"

// <----------------------->
// Types used internally for All segments Creation/View/Edit components
export type SegmentRuleType = {
	attribute: SegmentRuleAttribute
	condition: SegmentRuleCondition
	country?: string
	group?: OptionType
	// Optional since it only exists for editing rules
	id?: string
	segment?: OptionType
	specification?: string
}

export type SegmentConditionType = {
	// Optional since it only exists for editing conditions
	id?: string
	rules: SegmentRuleType[]
}
// <----------------------->

/**
 * Filters used in Filters bar (Internally / Only Client-Side - Not sent to the server)
 */
export type ContactSegmentFilter = DateRange

type ContactSegmentSearchFilter = { any?: true; name?: string }

/**
 * Arguments passed to the getSegments` query, used to fetch Segments List
 */
export type GetSegmentsParams = PaginationAndSorting<Segment> & ContactSegmentFilter & ContactSegmentSearchFilter

/**
 * Body Arguments passed to the `createSegment` mutation, used to post a new created segment entry
 */
export type CreateSegmentBody = Pick<Segment, "name"> &
	Partial<Pick<Segment, "description" | "id">> & {
		contactSegmentConditionList: {
			contactSegmentRuleList: {
				contactSegmentId: string | undefined
				contactSegmentRuleAttribute: SegmentRuleAttribute
				contactSegmentRuleCondition: SegmentRuleCondition
				country: string | undefined
				groupId: string | undefined
				id: string | undefined
				specification: string | undefined
			}[]
			id?: string
		}[]
	}

/**
 * Returned data shape from the `getSegmentById` query, used to get Segment details
 */
export type GetSegmentByIdReturnValue = Pick<Segment, "description" | "id" | "name"> & {
	contactSegmentConditionDetailsList: {
		contactSegmentRuleDetailsList: {
			contactSegment: Record<"id" | "name", string>
			contactSegmentRuleAttribute: SegmentRuleAttribute
			contactSegmentRuleCondition: SegmentRuleCondition
			country?: string
			group: Record<"id" | "name", string>
			id: string
			specification?: string
		}[]
		id: string
	}[]
}
