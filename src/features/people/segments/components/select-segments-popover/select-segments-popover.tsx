//#region Import
import { SelectAsyncOptionsPopover } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectSegmentsPopoverContent = lazy(() => import("./select-segments-popover-content"))
//#endregion

const SelectSegmentsPopover = ({
	label,
	...props
}: React.ComponentPropsWithoutRef<typeof SelectAsyncOptionsPopover>) => {
	const { t } = useTranslation("segments", { keyPrefix: "components.segmentsPopover" })

	return (
		<SelectAsyncOptionsPopover
			label={label || t("label")}
			placeholder={t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}
			{...props}>
			<SelectSegmentsPopoverContent />
		</SelectAsyncOptionsPopover>
	)
}

export default SelectSegmentsPopover
