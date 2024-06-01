//#region Import
import { Label, SelectAsyncPopover } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectExportedByPopoverContent = lazy(() => import("./select-exported-by-popover-content"))
//#endregion

type SelectExportedByPopoverProps = React.ComponentPropsWithoutRef<typeof SelectAsyncPopover> & {
	label?: string
}

const SelectExportedByPopover = ({ label, placeholder, ...props }: SelectExportedByPopoverProps) => {
	const { t } = useTranslation("exports", { keyPrefix: "components.exportedByPopover" })

	return (
		<div className='relative w-full max-w-[340px]'>
			<Label>{label || t("label")}</Label>

			<SelectAsyncPopover {...props} placeholder={placeholder || t("placeholder")}>
				<SelectExportedByPopoverContent />
			</SelectAsyncPopover>
		</div>
	)
}

export default SelectExportedByPopover
