//#region Import
import type { TemplateLanguage } from "@/features/templates/common/types"

import templateLanguagesLocaleMap from "./template-languages-local-map"
//#endregion

const templateLanguagesOptions = (Object.entries(templateLanguagesLocaleMap) as [TemplateLanguage, string][])?.map(
	([value, label]) => ({ label, value })
)

export default templateLanguagesOptions
