//#region Import
import type { SmsTemplateStatusOption } from "../types"
//#endregion

// TODO: add translation
export const smsTemplateStatusesLocaleMap: Record<SmsTemplateStatusOption, string> = {
	DRAFT: "Draft",
	PUBLISHED: "Published",
}

const smsTemplateStatusesOptions = (
	Object.entries(smsTemplateStatusesLocaleMap) as [SmsTemplateStatusOption, string][]
)?.map(([value, label]) => ({ value, label }))

export default smsTemplateStatusesOptions
