//#region Import
import type { GetListParams } from "@/core/lib/redux-toolkit/types"
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
export type SmsTemplateType = {
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
 * Params passed to the `getSmsTemplates` query, used for fetching SMS Templates List
 */
export type GetSmsTemplatesParams = GetListParams<SmsTemplateType> &
	DateRange & {
		name?: string
		statuses?: SmsTemplateStatusOption[]
		types?: SmsTemplateTypeOption[]
		languages?: SmsTemplateLanguageOption[]
		any?: boolean
	}

/**
 * Body Arguments passed to the `addNewSmsTemplate` mutation, used to create a new SMS Template entry
 */
export type AddNewSmsTemplateBody = Omit<SmsTemplateType, "updatedAt" | "id">

/**
 * Body Arguments passed to the `updateSmsTemplate` mutation, used to update an existing SMS Template entry
 */
export type UpdateSmsTemplateBody = Omit<SmsTemplateType, "updatedAt">

/**
 * Body Arguments passed to the `deleteSmsTemplates` mutation, used for deleting one or more SMS Template/s
 */
export type DeleteSmsTemplatesBody = string[]
