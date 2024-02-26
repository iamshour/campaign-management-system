//#region Import
import exportStatusOptions from "@/features/people/exports/constants/export-status-options"
import { ComboBoxPopper } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

const SelectExportsStatusesPopoverContent = () => {
	const { t } = useTranslation("exports")

	return (
		<ComboBoxPopper
			options={Object.entries(exportStatusOptions)?.map(([value, label]) => ({ label: t(label), value }))}
		/>
	)
}

export default SelectExportsStatusesPopoverContent
