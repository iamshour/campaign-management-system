//#region Import
import { Label, SelectMultiOptionsPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import templateTypesLocaleMap from "../constants/template-types-local-map"
import templateTypesOptions from "../constants/template-types-options"
import { TemplateType } from "../types"
//#endregion

interface SelectMultiTemplateTypesPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof SelectMultiOptionsPopover>, "options" | "value"> {
	label?: string
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
		<div className='relative w-full max-w-[340px]'>
			<Label>{label || t("components.selectMultiTemplateTypesPopover.label")}</Label>

			<SelectMultiOptionsPopover
				options={templateTypesOptions?.map(({ label, value }) => ({ label: t(label), value }))}
				placeholder={placeholder ?? t("components.selectMultiTemplateTypesPopover.placeholder")}
				value={
					value?.length ? value?.map((op) => ({ label: t(templateTypesLocaleMap[op as TemplateType]), value: op })) : []
				}
				{...props}
			/>
		</div>
	)
}

export default SelectMultiTemplateTypesPopover
