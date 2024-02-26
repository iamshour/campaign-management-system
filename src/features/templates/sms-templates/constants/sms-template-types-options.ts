//#region Import
import type { SmsTemplateTypeOption } from "../types"

import smsTemplateTypesLocaleMap from "./sms-template-types-local-map"
//#endregion

const smsTemplateTypesOptions = (Object.entries(smsTemplateTypesLocaleMap) as [SmsTemplateTypeOption, string][])?.map(
	([value, label]) => ({
		label,
		value,
	})
)

export default smsTemplateTypesOptions
