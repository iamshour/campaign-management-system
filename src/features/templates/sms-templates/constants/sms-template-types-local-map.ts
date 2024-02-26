//#region Import
import type { SmsTemplateTypeOption } from "../types"
//#endregion

const smsTemplateTypesLocaleMap: Record<SmsTemplateTypeOption, string> = {
	OTP: "OTP",
	PROMOTIONAL: "Promotional",
	TRANSACTIONAL: "Transactional",
}

export default smsTemplateTypesLocaleMap
