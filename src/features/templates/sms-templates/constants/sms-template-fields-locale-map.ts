import type { SmsTemplateType } from "../types"

const smsTemplateFieldsLocaleMap: Partial<Record<keyof SmsTemplateType, string>> = {
	name: "sms-templates:fields.name",
	type: "sms-templates:fields.type",
	language: "sms-templates:fields.language",
	updatedAt: "sms-templates:fields.updatedAt",
	status: "sms-templates:fields.status",
}

export default smsTemplateFieldsLocaleMap
