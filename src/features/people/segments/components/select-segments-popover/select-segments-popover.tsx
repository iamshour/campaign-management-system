//#region Import
import { Label, SelectAsyncPopover } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectSegmentsPopoverContent = lazy(() => import("./select-segments-popover-content"))
//#endregion

type SelectSegmentsPopoverProps = React.ComponentPropsWithoutRef<typeof SelectAsyncPopover> & {
	label?: string
}

const SelectSegmentsPopover = ({ label, ...props }: SelectSegmentsPopoverProps) => {
	const { t } = useTranslation("segments", { keyPrefix: "components.segmentsPopover" })

	return (
		<div className='relative w-full max-w-[340px]'>
			<Label>{label || t("label")}</Label>

			<SelectAsyncPopover placeholder={t(props?.isMulti ? "placeholder.multi" : "placeholder.single")} {...props}>
				<SelectSegmentsPopoverContent />
			</SelectAsyncPopover>
		</div>
	)
}

export default SelectSegmentsPopover
