//#region Import
import { useTranslation } from "react-i18next"

import exportStatusOptions from "@/features/people/exports/constants/export-status-options"
import { ComboBoxPopper } from "@/ui"
//#endregion

const SelectStatusesPopoverContent = () => {
	const { t } = useTranslation("exports")

	return (
		<ComboBoxPopper
			options={Object.entries(exportStatusOptions)?.map(([value, label]) => ({ value, label: t(label) }))}
		/>
	)
}

export default SelectStatusesPopoverContent
