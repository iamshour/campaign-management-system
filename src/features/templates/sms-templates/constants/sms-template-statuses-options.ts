//#region Import
import type { SmsTemplateStatusOption } from "../types"
//#endregion

// TODO: add translation
const smsTemplateStatusesLocaleMap: Record<SmsTemplateStatusOption, string> = {
	DRAFT: "Draft",
	PUBLISHED: "Published",
	DELETED: "Deleted",
}

const smsTemplateStatusesOptions = (
	Object.entries(smsTemplateStatusesLocaleMap) as [SmsTemplateStatusOption, string][]
)?.map(([value, label]) => ({ value, label }))

export default smsTemplateStatusesOptions
