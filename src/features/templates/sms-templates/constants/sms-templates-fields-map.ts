import type { SmsTemplate } from "../types"

const smsTemplatesFieldsMap: Partial<Record<keyof SmsTemplate, string>> = {
	name: "sms-templates:fields.name",
	type: "sms-templates:fields.type",
	language: "sms-templates:fields.language",
	updatedAt: "sms-templates:fields.updatedAt",
	status: "sms-templates:fields.status",
}

export default smsTemplatesFieldsMap
