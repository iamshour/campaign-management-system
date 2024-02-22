//#region Import
import type { SmsTemplateLanguageOption } from "../types"
//#endregion

// TODO: add translation
export const smsTemplateLanguagesLocaleMap: Record<SmsTemplateLanguageOption, string> = {
	ENGLISH: "English",
	ARABIC: "Arabic",
	OTHER: "Other",
}

export const smsTemplateLanguagesOptions = (
	Object.entries(smsTemplateLanguagesLocaleMap) as [SmsTemplateLanguageOption, string][]
)?.map(([value, label]) => ({ value, label }))

export default smsTemplateLanguagesOptions
