//#region Import
import { CommonListArguments } from "@/core/lib/redux-toolkit/types"
import type { DateRange } from "@/ui"
//#endregion

/**
 * Shape of fetched Industry
 */
export type IndustryType = {
	id: string
	name: string
	icon: string
	description: string
	color: string
	createdAt: string
}

/**
 * Arguments used for the `getIndustries` query, passed for the server as params when fetching Industries
 */
export type GetIndustriesArgs = CommonListArguments<IndustryType> & {
	name?: string
	any?: boolean
}

/**
 * Filters used in Filters bar (Internally / Only Client-Side - Not sent to the server)
 */
export type IndustriesTableFiltersType = {
	dateRange?: DateRange
}

/**
 * Arguments passed to the server whilst using the `addNewIndustry` mutation to post a new industry entry
 */
export type AddNewIndustryArgs = Pick<IndustryType, "name" | "description" | "icon" | "color">

/**
 * Arguments passed to the server whilst using the `updateIndustry` mutation to post a new industry entry
 */
export type UpdateIndustryArgs = AddNewIndustryArgs & Pick<IndustryType, "id">
