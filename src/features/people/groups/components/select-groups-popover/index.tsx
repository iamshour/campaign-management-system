//#region Import
import { ComboBox } from "@blueai/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectGroupsPopoverContent = lazy(() => import("./select-groups-popover-content"))
//#endregion

const SelectGroupsPopover = ({ label, ...props }: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	const { t } = useTranslation("groups", { keyPrefix: "components.groupsPopover" })

	return (
		<ComboBox label={label ?? t("label")} {...props}>
			<ComboBox.Trigger>{t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}</ComboBox.Trigger>

			<ComboBox.Content>
				<SelectGroupsPopoverContent />
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectGroupsPopover
