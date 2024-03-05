//#region Import
import { MultiSelectPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import templateTypesLocaleMap from "../constants/template-types-local-map"
// import templateTypesLocaleMap from "../constants/template-types-local-map"
import templateTypesOptions from "../constants/template-types-options"
import { TemplateType } from "../types"
//#endregion

interface SelectMultiTemplateTypesPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof MultiSelectPopover>, "options" | "value"> {
	value?: TemplateType[]
}

const SelectMultiTemplateTypesPopover = ({ label, value, ...props }: SelectMultiTemplateTypesPopoverProps) => {
	const { t } = useTranslation("templates-common")

	return (
		<MultiSelectPopover
			{...props}
			label={label ?? t("components.selectMultiTemplateTypesPopover.label")}
			options={templateTypesOptions?.map(({ label, value }) => ({ label: t(label), value }))}
			value={
				value?.length ? value?.map((op) => ({ label: t(templateTypesLocaleMap[op as TemplateType]), value: op })) : []
			}
		/>
	)
}

export default SelectMultiTemplateTypesPopover
