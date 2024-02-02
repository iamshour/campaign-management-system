//#region Import
import { lazy } from "react"
import { useTranslation } from "react-i18next"

import { ComboBox } from "@/ui"

const SelectExportedByPopoverContent = lazy(() => import("./select-exported-by-popover-content"))
//#endregion

const SelectExportedByPopover = ({ label, ...props }: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	const { t } = useTranslation("exports", { keyPrefix: "components.exportedByPopover" })

	return (
		<ComboBox label={label ?? t("label")} {...props}>
			<ComboBox.Trigger>{t("placeholder")}</ComboBox.Trigger>

			<ComboBox.Content>
				<SelectExportedByPopoverContent />
			</ComboBox.Content>
		</ComboBox>
	)
}
export default SelectExportedByPopover
