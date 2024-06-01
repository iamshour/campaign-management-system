//#region Import
import type { TemplateType } from "../types"
//#endregion

const templateTypesLocaleMap: Record<TemplateType, string> = {
	OTP: "templates-common:templateTypes.otp",
	PROMOTIONAL: "templates-common:templateTypes.promotional",
	TRANSACTIONAL: "templates-common:templateTypes.transactional",
}

export default templateTypesLocaleMap
