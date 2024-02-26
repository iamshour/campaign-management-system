//#region Import
import type { SmsTemplateStatusOption } from "../types"
//#endregion

const smsTemplateStatusesLocaleMap: Record<SmsTemplateStatusOption, string> = {
	DRAFT: "Draft",
	PUBLISHED: "Published",
}

export default smsTemplateStatusesLocaleMap
