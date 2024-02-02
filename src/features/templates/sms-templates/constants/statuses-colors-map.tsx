import type { SmsTemplateStatusOption } from "../types"

const smsTemplatesStatusesColorsMap: Record<SmsTemplateStatusOption, string> = {
	DRAFT: "#DBDBDB",
	PUBLISHED: "#9EC654",
	DELETED: "#E44949",
}

export default smsTemplatesStatusesColorsMap
