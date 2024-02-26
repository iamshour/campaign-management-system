//#region Import
import type { SmsTemplateType } from "../types"
//#endregion

const smsTemplateFieldsLocaleMap: Partial<Record<keyof SmsTemplateType, string>> = {
	language: "sms-templates:fields.language",
	name: "sms-templates:fields.name",
	status: "sms-templates:fields.status",
	type: "sms-templates:fields.type",
	updatedAt: "sms-templates:fields.updatedAt",
}

export default smsTemplateFieldsLocaleMap
