//#region Import
import type { BaseFetchListArgs } from "@/core/lib/redux-toolkit/types"
import type { DateRange } from "@/ui"
//#endregion

/**
 * Type options for the SMS Template
 */
export type SmsTemplateTypeOption = "PROMOTIONAL" | "TRANSACTIONAL" | "OTP"

/**
 * Language options for the SMS Template
 */
export type SmsTemplateLanguageOption = "ENGLISH" | "ARABIC" | "OTHER"

/**
 * Status options for the SMS Template
 */
export type SmsTemplateStatusOption = "PUBLISHED" | "DRAFT"

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
 * Filters used in Filters bar (Internally / Only Client-Side - Not sent to the server)
 */
export type SmsTemplatesTableFiltersType = {
	dateRange?: DateRange
	templateStatus?: SmsTemplateStatusOption[]
	templateType?: SmsTemplateTypeOption[]
	templateLanguage?: SmsTemplateLanguageOption[]
}

/**
 * Arguments used for the `getSmsTemplates` query, passed for the server as params when fetching SMS Templates List
 */
export type GetSmsTemplatesArgs = BaseFetchListArgs<SmsTemplateType> &
	DateRange & {
		name?: string
		statuses?: SmsTemplateStatusOption[]
		types?: SmsTemplateTypeOption[]
		languages?: SmsTemplateLanguageOption[]
		any?: boolean
	}

/**
 * Arguments passed to the server whilst using the `addNewSmsTemplate` mutation to create a new SMS Template entry
 */
export type AddNewSmsTemplateArgs = Omit<SmsTemplateType, "updatedAt" | "id">

/**
 * Arguments passed to the server whilst using the `updateSmsTemplate` mutation to update a SMS Template
 */
export type UpdateSmsTemplateArgs = Omit<SmsTemplateType, "updatedAt">

/**
 * Arguments used for the `deleteSmsTemplates` query, passed for the server as params when deleting SMS Template/s
 */
export type DeleteSmsTemplatesArgs = string[]
