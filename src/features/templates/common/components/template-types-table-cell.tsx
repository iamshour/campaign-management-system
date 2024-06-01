//#region Import
import { useTranslation } from "react-i18next"

import type { TemplateType } from "../types"

import templateTypesLocaleMap from "../constants/template-types-local-map"
//#endregion

interface TemplateTypesTableColumnProps {
	types: TemplateType[]
}

// Component used inside Table to render one or more Template Types inside Cell
const TemplateTypesTableColumn = ({ types }: TemplateTypesTableColumnProps) => {
	const { t } = useTranslation("templates-common")

	return <>{types.map((type) => t(templateTypesLocaleMap[type]))?.join(" / ")}</>
}

export default TemplateTypesTableColumn
