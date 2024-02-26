//#region Import
import type { SmsTemplateStatusOption } from "../types"

import smsTemplateStatusesLocaleMap from "./sms-template-statuses-local-map"
//#endregion

const smsTemplateStatusesOptions = (
	Object.entries(smsTemplateStatusesLocaleMap) as [SmsTemplateStatusOption, string][]
)?.map(([value, label]) => ({ label, value }))

export default smsTemplateStatusesOptions
