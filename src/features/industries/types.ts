//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { TemplateLanguage, TemplateStatus, TemplateType } from "@/features/templates/common/types"
import type { DateRange } from "@/ui"

import type { SmsTemplateType } from "../templates/sms-templates/types"
import type { IndustryIconEnum } from "./constants/industries-icons-map"
//#endregion

/**
 * Shape of fetched Industry
 */
export type IndustryType = {
	color: string
	createdAt: string
	description: string
	icon: IndustryIconEnum
	id: string
	name: string
}

/**
 * Filters used in Filters bar, and in some api calls such as in params of `GetIndustriesParams` query
 */
export type IndustryFilter = DateRange

type IndustrySearchFilter = { any?: true; name?: string }

/**
 * Params passed to the `getIndustries` query, used for fetching Industries
 */
export type GetIndustriesParams = IndustryFilter & IndustrySearchFilter & PaginationAndSorting<IndustryType>

/**
 * Body Arguments passed to the `addNewIndustry` mutation, used to post a new Industry entry
 */
export type AddNewIndustryBody = Omit<IndustryType, "createdAt" | "id">

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
	background: string
	backgroundImage?: string
	channel: string
	createdAt: string
	industryId: string
	industryName: string
	mostPopular: boolean
}

/**
 * Filters used in Filters bar, and in some api calls such as in params of `getSmsIndustryTemplates` query, and body of `deleteIndustryTemplates` mutation
 */
export type PrebuiltTemplateFilter = DateRange & {
	// Only used internally (Not sent to BE)
	filterBy?: "ALL" | "POPULAR" | "RECENT"
	industryId?: string
	languages?: TemplateLanguage[]
	mostPopular?: boolean
	statuses?: TemplateStatus[]
	types?: TemplateType[]
}

type PrebuiltTemplateSearchFilter = { any?: true; name?: string }

/**
 * Params passed to the `getSmsIndustryTemplates` query, used for fetching SMS Industry Templates List
 */
export type GetSmsIndustryTemplatesParams = PaginationAndSorting<SmsIndustryTemplateType> &
	Omit<PrebuiltTemplateFilter, "filterBy"> &
	PrebuiltTemplateSearchFilter

/**
 * Body Arguments passed to the `addNewSmsIndustryTemplate` mutation, used to add an Industry Template
 */
export type AddNewSmsIndustryTemplateBody = Pick<
	SmsIndustryTemplateType,
	"body" | "channel" | "industryId" | "language" | "mostPopular" | "name" | "status" | "type"
>

/**
 * Body Arguments passed to the `updateSmsIndustryTemplate` mutation, used to update an Industry Template
 */
export type UpdateSmsIndustryTemplateBody = Pick<
	SmsIndustryTemplateType,
	"body" | "channel" | "industryId" | "language" | "mostPopular" | "name" | "status" | "type"
>

/**
 * Body Arguments passed to the `deleteIndustryTemplates` query, used for deleting Industry Template/s
 */
export type DeleteIndustryTemplatesBody = {
	industryId: string
	prebuiltTemplateFilter?: PrebuiltTemplateFilter
	prebuiltTemplateSearchFilter?: PrebuiltTemplateSearchFilter
	prebuiltTemplatesIds: string[]
}
