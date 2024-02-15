//#region Import
import type { BaseFetchListArgs } from "@/core/lib/redux-toolkit/types"
import type { DateRange } from "@/ui"

import type {
	SmsTemplateLanguageOption,
	SmsTemplateType,
	SmsTemplateTypeOption,
	SmsTemplatesTableFiltersType,
} from "../templates/sms-templates/types"
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
 * Filters used in Filters bar (Internally / Only Client-Side - Not sent to the server)
 */
export type IndustriesTableFiltersType = { dateRange?: DateRange }

/**
 * Arguments used for the `getIndustries` query, passed for the server as params when fetching Industries
 */
export type GetIndustriesListArgs = BaseFetchListArgs<IndustryType> & DateRange & { name?: string; any?: boolean }

/**
 * Arguments passed to the server whilst using the `addNewIndustry` mutation to post a new Industry entry
 */
export type AddNewIndustryArgs = Omit<IndustryType, "id" | "createdAt">

/**
 * Arguments passed to the server whilst using the `updateIndustry` mutation to update an Industry
 */
export type UpdateIndustryArgs = Omit<IndustryType, "createdAt">

// ---------------------------------------------
// ALL TYPES RELATED TO SMS INDUSTRY TEMPLATES
// ---------------------------------------------

/**
 * Shape of fetched SMS Industry Template
 */
export type SmsIndustryTemplateType = SmsTemplateType & {
	industryId: string
	createdAt: string
	mostPopular: boolean
	background: string
}

/**
 * Filters used in Filters bar (Internally / Only Client-Side - Not sent to the server)
 */
export type SmsIndustryTemplatesTableFiltersType = SmsTemplatesTableFiltersType & {
	filterBy?: "POPULAR" | "RECENT"
	industryId?: string | "ALL"
}

/**
 * Arguments used for the `getSmsIndustryTemplates` query, passed for the server as params when fetching SMS Industry Templates List
 */
export type GetSmsIndustryTemplatesArgs = BaseFetchListArgs<SmsIndustryTemplateType> & {
	industryId?: string
	name?: string
	any?: boolean
	type?: SmsTemplateTypeOption[]
	language?: SmsTemplateLanguageOption[]
	mostPopular?: boolean
	background?: string
}

/**
 * Arguments used for the `deleteIndustryTemplates` query, passed for the server as params when deleting Industry Template/s
 */
export type DeleteIndustryTemplatesArgs = {
	id: string

	templatesIds: string[]
}

/**
 * Arguments passed to the server whilst using the `addNewSmsIndustryTemplate` mutation to post a new Template for an Industry
 */
export type AddNewSmsIndustryTemplateArgs = Omit<SmsIndustryTemplateType, "id" | "createdAt" | "updatedAt">

/**
 * Arguments passed to the server whilst using the `updateSmsIndustryTemplate` mutation to update an Industry Template
 */
export type UpdateSmsIndustryTemplateArgs = Omit<SmsIndustryTemplateType, "createdAt" | "updatedAt">
