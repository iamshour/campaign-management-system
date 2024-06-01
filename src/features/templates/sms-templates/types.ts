//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { TemplateLanguage, TemplateStatus, TemplateType } from "@/features/templates/common/types"
import type { DateRange } from "@/ui"
//#endregion

/**
 * Shape of fetched SMS Template
 */
export type SmsTemplateType = {
	body: string
	id: string
	language: TemplateLanguage
	name: string
	status: TemplateStatus
	type: TemplateType
	updatedAt: string
}

/**
 * Filters used in Filters bar, as well as in params and body request of some api calls (`getSmsTemplates`, `deleteSmsTemplates`)
 */
export type TemplateFilter = DateRange & {
	languages?: TemplateLanguage[]
	statuses?: TemplateStatus[]
	types?: TemplateType[]
}

type TemplateSearchFilter = { any?: true; name?: string }

/**
 * Params passed to the `getSmsTemplates` query, used for fetching SMS Templates List
 */
export type GetSmsTemplatesParams = PaginationAndSorting<SmsTemplateType> & TemplateFilter & TemplateSearchFilter

/**
 * Body Arguments passed to the `addNewSmsTemplate` mutation, used to create a new SMS Template entry
 */
export type AddNewSmsTemplateBody = Omit<SmsTemplateType, "id" | "updatedAt">

/**
 * Body Arguments passed to the `updateSmsTemplate` mutation, used to update an existing SMS Template entry
 */
export type UpdateSmsTemplateBody = Omit<SmsTemplateType, "updatedAt">

/**
 * Body Arguments passed to the `deleteSmsTemplates` mutation, used for deleting one or more SMS Template/s
 */
export type DeleteSmsTemplatesBody = {
	templateFilter?: TemplateFilter
	templateSearchFilter: TemplateSearchFilter | undefined
	templatesIds?: string[]
}
