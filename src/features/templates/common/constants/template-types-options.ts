//#region Import
import type { TemplateType } from "../types"

import templateTypesLocaleMap from "./template-types-local-map"
//#endregion

const templateTypesOptions = (Object.entries(templateTypesLocaleMap) as [TemplateType, string][])?.map(
	([value, label]) => ({
		label,
		value,
	})
)

export default templateTypesOptions
