//#region Import
import type { SmsTemplateTypeOption } from "../types"
//#endregion

// TODO: add translation
const smsTemplatesTypeOptions: Record<SmsTemplateTypeOption, string> = {
	PROMOTIONAL: "Promotional",
	TRANSACTIONAL: "Transactional",
	OTP: "OTP",
}

export default smsTemplatesTypeOptions
