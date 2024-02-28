//#region Import
import type { TemplateTypeOption } from "../types"
//#endregion

const templateTypesLocaleMap: Record<TemplateTypeOption, string> = {
	OTP: "OTP",
	PROMOTIONAL: "Promotional",
	TRANSACTIONAL: "Transactional",
}

export default templateTypesLocaleMap
