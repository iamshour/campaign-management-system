//#region Import
import { SelectAsyncOptionsPopover } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectExportedByPopoverContent = lazy(() => import("./select-exported-by-popover-content"))
//#endregion

const SelectExportedByPopover = ({
	label,
	placeholder,
	...props
}: React.ComponentPropsWithoutRef<typeof SelectAsyncOptionsPopover>) => {
	const { t } = useTranslation("exports", { keyPrefix: "components.exportedByPopover" })

	return (
		<SelectAsyncOptionsPopover {...props} label={label || t("label")} placeholder={placeholder || t("placeholder")}>
			<SelectExportedByPopoverContent />
		</SelectAsyncOptionsPopover>
	)
}

export default SelectExportedByPopover
