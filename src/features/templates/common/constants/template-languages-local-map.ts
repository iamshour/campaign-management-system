//#region Import
import type { TemplateLanguage } from "@/features/templates/common/types"
//#endregion

const templateLanguagesLocaleMap: Record<TemplateLanguage, string> = {
	ARABIC: "templates-common:templateLanguages.arabic",
	ENGLISH: "templates-common:templateLanguages.english",
	OTHER: "templates-common:templateLanguages.other",
}

export default templateLanguagesLocaleMap
