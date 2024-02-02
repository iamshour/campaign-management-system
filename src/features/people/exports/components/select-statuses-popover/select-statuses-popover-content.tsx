//#region Import
import { ComboBoxPopper } from "@blueai/ui"
import { useTranslation } from "react-i18next"

import exportStatusOptions from "@/features/people/exports/constants/export-status-options"
//#endregion

const SelectStatusesPopoverContent = () => {
	const { t } = useTranslation("exports")

	return (
		<ComboBoxPopper
			// eslint-disable-next-line
			// @ts-ignore
			options={Object.entries(exportStatusOptions)?.map(([value, label]) => ({ value, label: t(label) }))}
		/>
	)
}

export default SelectStatusesPopoverContent
