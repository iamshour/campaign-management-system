import { CommonListArguments } from "@/core/lib/redux-toolkit/types"

/**
 * Fetched Industry Type
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
 * Arguments passed to the server whilst using the `getIndustryList` query to fetch Industry List
 */
export type GetIndustryListArgs = CommonListArguments<IndustryType> & {
	name?: string
}
