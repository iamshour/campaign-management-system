//#region Import
import { SelectAsyncOptionsPopover } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectGroupsPopoverContent = lazy(() => import("./select-groups-popover-content"))
//#endregion

const SelectGroupsPopover = ({ label, ...props }: React.ComponentPropsWithoutRef<typeof SelectAsyncOptionsPopover>) => {
	const { t } = useTranslation("groups", { keyPrefix: "components.groupsPopover" })

	return (
		<SelectAsyncOptionsPopover
			label={label ?? t("label")}
			placeholder={t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}
			{...props}>
			<SelectGroupsPopoverContent />
		</SelectAsyncOptionsPopover>
	)
}

export default SelectGroupsPopover
