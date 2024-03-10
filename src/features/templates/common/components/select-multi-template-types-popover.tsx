//#region Import
import { SelectMultiOptionsPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import templateTypesLocaleMap from "../constants/template-types-local-map"
import templateTypesOptions from "../constants/template-types-options"
import { TemplateType } from "../types"
//#endregion

interface SelectMultiTemplateTypesPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof SelectMultiOptionsPopover>, "options" | "value"> {
	value?: TemplateType[]
}

const SelectMultiTemplateTypesPopover = ({
	label,
	placeholder,
	value,
	...props
}: SelectMultiTemplateTypesPopoverProps) => {
	const { t } = useTranslation("templates-common")

	return (
		<SelectMultiOptionsPopover
			label={label ?? t("components.selectMultiTemplateTypesPopover.label")}
			options={templateTypesOptions?.map(({ label, value }) => ({ label: t(label), value }))}
			placeholder={placeholder ?? t("components.selectMultiTemplateTypesPopover.placeholder")}
			value={
				value?.length ? value?.map((op) => ({ label: t(templateTypesLocaleMap[op as TemplateType]), value: op })) : []
			}
			{...props}
		/>
	)
}

export default SelectMultiTemplateTypesPopover
