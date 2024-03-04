//#region Import
import type { SmsSenderType } from "../types"
//#endregion

const smsTemplateFieldsLocaleMap: Partial<Record<keyof SmsSenderType, string>> = {
	createdAt: "sms-senders:fields.createdAt",
	name: "sms-senders:fields.name",
	types: "sms-senders:fields.types",
}

export default smsTemplateFieldsLocaleMap
