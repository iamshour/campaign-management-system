//#region Import
import type { SmsTemplateLanguageOption } from "../types"

import smsTemplateLanguagesLocaleMap from "./sms-template-languages-local-map"
//#endregion

const smsTemplateLanguagesOptions = (
	Object.entries(smsTemplateLanguagesLocaleMap) as [SmsTemplateLanguageOption, string][]
)?.map(([value, label]) => ({ label, value }))

export default smsTemplateLanguagesOptions
