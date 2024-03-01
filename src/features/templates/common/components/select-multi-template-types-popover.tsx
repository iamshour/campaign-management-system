//#region Import
import { MultiSelectPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import templateTypesOptions from "../constants/template-types-options"
//#endregion

const SelectMultiTemplateTypesPopover = ({
	label,
	...props
}: Omit<React.ComponentPropsWithoutRef<typeof MultiSelectPopover>, "options">) => {
	const { t } = useTranslation("templates-common", { keyPrefix: "components.selectMultiTemplateTypesPopover" })

	return <MultiSelectPopover {...props} label={label ?? t("label")} options={templateTypesOptions} />
}

export default SelectMultiTemplateTypesPopover
