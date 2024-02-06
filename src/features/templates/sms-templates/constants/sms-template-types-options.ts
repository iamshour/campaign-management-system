//#region Import
import type { SmsTemplateTypeOption } from "../types"
//#endregion

// TODO: add translation
export const smsTemplateTypesLocaleMap: Record<SmsTemplateTypeOption, string> = {
	PROMOTIONAL: "Promotional",
	TRANSACTIONAL: "Transactional",
	OTP: "OTP",
}

export const smsTemplateTypesOptions = (
	Object.entries(smsTemplateTypesLocaleMap) as [SmsTemplateTypeOption, string][]
)?.map(([value, label]) => ({
	value,
	label,
}))

export default smsTemplateTypesOptions
