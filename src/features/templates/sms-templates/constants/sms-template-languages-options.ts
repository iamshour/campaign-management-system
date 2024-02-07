//#region Import
import type { SmsTemplateLanguageOption } from "../types"
//#endregion

// TODO: add translation
const smsTemplateLanguagesLocaleMap: Record<SmsTemplateLanguageOption, string> = {
	ENGLISH: "English",
	UNICODE: "Unicode",
}

export const smsTemplateLanguagesOptions = (
	Object.entries(smsTemplateLanguagesLocaleMap) as [SmsTemplateLanguageOption, string][]
)?.map(([value, label]) => ({ value, label }))

export default smsTemplateLanguagesOptions
