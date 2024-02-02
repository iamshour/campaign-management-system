//#region Import
import type { SmsTemplateStatusOption } from "../types"
//#endregion

// TODO: add translation
const smsTemplatesStatusOptions: Record<SmsTemplateStatusOption, string> = {
	DRAFT: "Draft",
	PUBLISHED: "Published",
	DELETED: "Deleted",
}

export default smsTemplatesStatusOptions
