//#region Import
import { CommonListArguments } from "@/core/lib/redux-toolkit/types"
import type { DateRange, TableState } from "@/ui"
//#endregion

/**
 * Type options for the SMS Template
 */
export type SmsTemplateTypeOption = "PROMOTIONAL" | "TRANSACTIONAL" | "OTP"

/**
 * Language options for the SMS Template
 */
export type SmsTemplateLanguageOption = "ENGLISH" | "UNICODE"

/**
 * Status options for the SMS Template
 */
export type SmsTemplateStatusOption = "PUBLISHED" | "DRAFT" | "DELETED"

/**
 * Shape of fetched SMS Template
 */
export interface SmsTemplateType {
	id: string
	name: string
	type: SmsTemplateTypeOption
	language: SmsTemplateLanguageOption
	updatedAt: string
	status: SmsTemplateStatusOption
	body: string
}

/**
 * Arguments used for the `getSmsTemplates` query, passed for the server as params when fetching SMS Templates List
 */
export type GetSmsTemplatesArgs = CommonListArguments<SmsTemplateType> & {
	name?: string
	statuses?: SmsTemplateStatusOption[]
	types?: SmsTemplateTypeOption[]
	languages?: SmsTemplateLanguageOption[]
	any?: boolean
}

/**
 * Returned data shape from the `getSmsTemplateById` query
 */
export type GetSmsTemplateBytIdReturnType = SmsTemplateType

/**
 * Arguments used for the `getSmsTemplates` query, passed for the server as params when fetching SMS Templates List
 */
export type DeleteSmsTemplatesArgs = string[]

/**
 * Filters used in Filters bar (Internally / Only Client-Side - Not sent to the server)
 */
export type SmsTemplatesTableFiltersType = {
	dateRange?: DateRange
	templateStatus?: SmsTemplateStatusOption[]
	templateType?: SmsTemplateTypeOption[]
	templateLanguage?: SmsTemplateLanguageOption[]
}

// ---------------------------------------------
// ALL TYPES RELATED TO PREBUILT TEMPLATES BELOW
// ---------------------------------------------

/**
 * Shape of fetched Prebuilt SMS Template
 */
export type SmsPrebuiltTemplateType = {
	id: string
	industryId: string
	name: string
	language: SmsTemplateLanguageOption
	type: SmsTemplateTypeOption
	createdAt: string
	updatedAt: string
	status: SmsTemplateStatusOption
	mostPopular: boolean
	background: string
	body: string
}

/**
 * Arguments used for the `getSmsTemplates` query, passed for the server as params when fetching SMS Prebuilt Templates List
 */
export type GetSmsPrebuiltTemplatesByIndustryIdArgs = Omit<TableState<SmsPrebuiltTemplateType>, "selection"> & {
	industryId: string
	name?: string
	any?: boolean
	type?: SmsTemplateTypeOption[]
	language?: SmsTemplateLanguageOption[]
	mostPopular?: boolean
}

/**
 * Filters used in Filters bar (Internally / Only Client-Side - Not sent to the server)
 */
export type SmsPrebuiltTemplatesTableFiltersType = {
	filterBy?: "POPULAR" | "RECENT"
	templateType?: SmsTemplateTypeOption[]
	templateLanguage?: SmsTemplateLanguageOption[]
	industryId?: string
}
