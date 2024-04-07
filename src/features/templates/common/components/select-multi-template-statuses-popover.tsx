//#region Import
import { Label, SelectMultiOptionsPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import templateStatusesLocaleMap from "../constants/template-statuses-local-map"
import templateStatusesOptions from "../constants/template-statuses-options"
import { TemplateStatus } from "../types"
//#endregion

interface SelectMultiTemplateStatusesPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof SelectMultiOptionsPopover>, "options" | "value"> {
	label?: string
	value?: TemplateStatus[]
}

const SelectMultiTemplateStatusesPopover = ({
	label,
	placeholder,
	value,
	...props
}: SelectMultiTemplateStatusesPopoverProps) => {
	const { t } = useTranslation("templates-common")

	return (
		<div className='relative w-full max-w-[340px]'>
			<Label>{label || t("components.selectMultiTemplateStatusesPopover.label")}</Label>

			<SelectMultiOptionsPopover
				options={templateStatusesOptions?.map(({ label, value }) => ({ label: t(label), value }))}
				placeholder={placeholder ?? t("components.selectMultiTemplateStatusesPopover.placeholder")}
				value={
					value?.length
						? value?.map((op) => ({ label: t(templateStatusesLocaleMap[op as TemplateStatus]), value: op }))
						: []
				}
				{...props}
			/>
		</div>
	)
}

export default SelectMultiTemplateStatusesPopover
