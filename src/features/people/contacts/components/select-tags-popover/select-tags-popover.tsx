//#region Import
import { SelectAsyncOptionsPopover } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectTagsPopoverContent = lazy(() => import("./select-tags-popover-content"))
//#endregion

const SelectTagsPopover = ({
	label,
	placeholder,
	...props
}: React.ComponentPropsWithoutRef<typeof SelectAsyncOptionsPopover>) => {
	const { t } = useTranslation("contacts", { keyPrefix: "components.tagsPopover" })

	return (
		<SelectAsyncOptionsPopover
			label={label ?? t("label")}
			placeholder={placeholder ?? t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}
			{...props}>
			<SelectTagsPopoverContent />
		</SelectAsyncOptionsPopover>
	)
}

export default SelectTagsPopover
