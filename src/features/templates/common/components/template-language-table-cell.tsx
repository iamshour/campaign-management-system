//#region Import
import { useTranslation } from "react-i18next"

import type { TemplateLanguage } from "../types"

import templateLanguagesLocaleMap from "../constants/template-languages-local-map"
//#endregion

const TemplateLanguageTableCell = ({ language }: { language: TemplateLanguage }) => {
	const { t } = useTranslation("templates-common")

	return t(templateLanguagesLocaleMap[language])
}

export default TemplateLanguageTableCell
