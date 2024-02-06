//#region Import
import type { SmsTemplateStatusOption } from "../types"
//#endregion

const smsTemplateStatusesColorsMap: Record<SmsTemplateStatusOption, string> = {
	DRAFT: "#DBDBDB",
	PUBLISHED: "#9EC654",
	DELETED: "#E44949",
}

export default smsTemplateStatusesColorsMap
