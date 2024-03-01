//#region Import
import { MultiSelectPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import exportsStatusesOptions from "../constants/exports-statuses-options"
//#endregion

const SelectMultiExportsStatusesPopover = ({
	label,
	...props
}: Omit<React.ComponentPropsWithoutRef<typeof MultiSelectPopover>, "options">) => {
	const { t } = useTranslation("exports")

	return (
		<MultiSelectPopover
			{...props}
			label={label || t("components.selectMultiExportsStatusesPopover.label")}
			options={exportsStatusesOptions?.map((op) => ({ ...op, label: t(op.label) }))}
			placeholder={t("components.selectMultiExportsStatusesPopover.placeholder")}
		/>
	)
}

export default SelectMultiExportsStatusesPopover
