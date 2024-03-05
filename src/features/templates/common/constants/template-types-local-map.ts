//#region Import
import type { TemplateType } from "../types"
//#endregion

const templateTypesLocaleMap: Record<TemplateType, string> = {
	OTP: "templates-common:components.selectMultiTemplateTypesPopover.options.otp",
	PROMOTIONAL: "templates-common:components.selectMultiTemplateTypesPopover.options.promotional",
	TRANSACTIONAL: "templates-common:components.selectMultiTemplateTypesPopover.options.transactional",
}

export default templateTypesLocaleMap
