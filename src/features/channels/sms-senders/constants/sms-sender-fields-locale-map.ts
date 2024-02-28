//#region Import
import type { SmsSenderType } from "../types"
//#endregion

const smsTemplateFieldsLocaleMap: Partial<Record<keyof SmsSenderType, string>> = {
	createdAt: "sms-senders:fields.createdAt",
	name: "sms-senders:fields.name",
	type: "sms-senders:fields.type",
}

export default smsTemplateFieldsLocaleMap
