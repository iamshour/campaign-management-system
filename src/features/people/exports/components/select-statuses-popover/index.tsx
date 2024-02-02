//#region Import
import { lazy } from "react"
import { useTranslation } from "react-i18next"

import { ComboBox } from "@/ui"

const SelectStatusesPopoverContent = lazy(() => import("./select-statuses-popover-content"))
//#endregion

const SelectStatusesPopover = ({ label, ...props }: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	const { t } = useTranslation("exports", { keyPrefix: "components.statusesPopover" })

	return (
		<ComboBox label={label ?? t("label")} {...props}>
			<ComboBox.Trigger>{t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}</ComboBox.Trigger>

			<ComboBox.Content>
				<SelectStatusesPopoverContent />
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectStatusesPopover
