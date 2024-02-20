//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { DateRange } from "@/ui"

import type {
	SmsTemplateLanguageOption,
	SmsTemplateStatusOption,
	SmsTemplateType,
	SmsTemplateTypeOption,
} from "../templates/sms-templates/types"

import type { IndustryIconEnum } from "./constants/industries-icons-map"
//#endregion

/**
 * Shape of fetched Industry
 */
export type IndustryType = {
	id: string
	name: string
	icon: IndustryIconEnum
	description: string
	color: string
	createdAt: string
}

/**
 * Filters used in Filters bar, and in some api calls such as in params of `GetIndustriesParams` query
 */
export type IndustryFilter = DateRange

type IndustrySearchFilter = { name?: string; any?: boolean }

/**
 * Params passed to the `getIndustries` query, used for fetching Industries
 */
export type GetIndustriesParams = PaginationAndSorting<IndustryType> & IndustryFilter & IndustrySearchFilter

/**
 * Body Arguments passed to the `addNewIndustry` mutation, used to post a new Industry entry
 */
export type AddNewIndustryBody = Omit<IndustryType, "id" | "createdAt">

/**
 * Body Arguments passed to the `updateIndustry` mutation, used to update an Industry
 */
export type UpdateIndustryBody = Omit<IndustryType, "createdAt">

// ---------------------------------------------
// ALL TYPES RELATED TO SMS INDUSTRY TEMPLATES
// ---------------------------------------------

/**
 * Shape of fetched SMS Industry Template
 */
export type SmsIndustryTemplateType = SmsTemplateType & {
	channel: string
	industryId: string
	createdAt: string
	mostPopular: boolean
	background: string
}

/**
 * Filters used in Filters bar, and in some api calls such as in params of `getSmsIndustryTemplates` query, and body of `deleteIndustryTemplates` mutation
 */
export type PrebuiltTemplateFilter = DateRange & {
	types?: SmsTemplateTypeOption[]
	languages?: SmsTemplateLanguageOption[]
	statuses?: SmsTemplateStatusOption[]
	mostPopular?: boolean
	industryId?: string

	// Only used internally (Not sent to BE)
	filterBy?: "POPULAR" | "RECENT"
}
type PrebuiltTemplateSearchFilter = { name?: string; any?: boolean }

/**
 * Params passed to the `getSmsIndustryTemplates` query, used for fetching SMS Industry Templates List
 */
export type GetSmsIndustryTemplatesParams = PaginationAndSorting<SmsIndustryTemplateType> &
	Omit<PrebuiltTemplateFilter, "filterBy"> &
	PrebuiltTemplateSearchFilter

/**
 * Body Arguments passed to the `deleteIndustryTemplates` query, used for deleting Industry Template/s
 */
export type DeleteIndustryTemplatesBody = {
	industryId: string
	prebuiltTemplatesIds: string[]
	prebuiltTemplateFilter?: PrebuiltTemplateFilter
	prebuiltTemplateSearchFilter?: PrebuiltTemplateSearchFilter
}

/**
 * Body Arguments passed to the `updateSmsIndustryTemplate` mutation, used to update an Industry Template
 */
export type UpdateSmsIndustryTemplateBody = Omit<SmsIndustryTemplateType, "createdAt" | "updatedAt">
