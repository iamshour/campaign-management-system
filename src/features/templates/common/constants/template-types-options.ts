//#region Import
import type { TemplateTypeOption } from "../types"

import templateTypesLocaleMap from "./template-types-local-map"
//#endregion

const templateTypesOptions = (Object.entries(templateTypesLocaleMap) as [TemplateTypeOption, string][])?.map(
	([value, label]) => ({
		label,
		value,
	})
)

export default templateTypesOptions
