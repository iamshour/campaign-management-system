//#region Import
import type { TableState } from "@/ui"
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
export interface SmsTemplate {
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
export type GetSmsTemplatesArgs = Omit<TableState<SmsTemplate>, "selection" | "count"> & {
	name?: string
	startDate?: string
	endDate?: string
	statuses?: SmsTemplateStatusOption[]
	types?: SmsTemplateTypeOption[]
	languages?: SmsTemplateLanguageOption[]
	any?: boolean
}

/**
 * Returned data shape from the `getSmsTemplateById` query
 */
export type GetSmsTemplateBytIdReturnType = SmsTemplate

/**
 * Arguments used for the `getSmsTemplates` query, passed for the server as params when fetching SMS Templates List
 */
export type DeleteSmsTemplatesArgs = string[]

/**
 * Filters that are applied in sms templates table, to be used in advanced-table-slice
 */
export type SmsTemplatesTableFilter = Omit<TableState<SmsTemplate>, "selection" | "count"> & {
	templateStatus?: SmsTemplateStatusOption[]
	templateType?: SmsTemplateTypeOption[]
	templateLanguage?: SmsTemplateLanguageOption[]
}
