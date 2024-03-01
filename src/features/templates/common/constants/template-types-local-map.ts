//#region Import
import type { TemplateType } from "../types"
//#endregion

const templateTypesLocaleMap: Record<TemplateType, string> = {
	OTP: "OTP",
	PROMOTIONAL: "Promotional",
	TRANSACTIONAL: "Transactional",
}

export default templateTypesLocaleMap
