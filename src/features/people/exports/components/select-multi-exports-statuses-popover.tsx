//#region Import
import { SelectMultiOptionsPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import exportsStatusesOptions from "../constants/exports-statuses-options"
//#endregion

const SelectMultiExportsStatusesPopover = ({
	label,
	...props
}: Omit<React.ComponentPropsWithoutRef<typeof SelectMultiOptionsPopover>, "options">) => {
	const { t } = useTranslation("exports")

	return (
		<SelectMultiOptionsPopover
			{...props}
			label={label || t("components.selectMultiExportsStatusesPopover.label")}
			options={exportsStatusesOptions?.map((op) => ({ ...op, label: t(op.label) }))}
			placeholder={t("components.selectMultiExportsStatusesPopover.placeholder")}
		/>
	)
}

export default SelectMultiExportsStatusesPopover
