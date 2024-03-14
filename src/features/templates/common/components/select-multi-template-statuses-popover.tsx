//#region Import
import { SelectMultiOptionsPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import templateStatusesLocaleMap from "../constants/template-statuses-local-map"
import templateStatusesOptions from "../constants/template-statuses-options"
import { TemplateStatus } from "../types"
//#endregion

interface SelectMultiTemplateStatusesPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof SelectMultiOptionsPopover>, "options" | "value"> {
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
		<SelectMultiOptionsPopover
			label={label ?? t("components.selectMultiTemplateStatusesPopover.label")}
			options={templateStatusesOptions?.map(({ label, value }) => ({ label: t(label), value }))}
			placeholder={placeholder ?? t("components.selectMultiTemplateStatusesPopover.placeholder")}
			value={
				value?.length
					? value?.map((op) => ({ label: t(templateStatusesLocaleMap[op as TemplateStatus]), value: op }))
					: []
			}
			{...props}
		/>
	)
}

export default SelectMultiTemplateStatusesPopover
