//#region Import
import { ComboBox } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectExportsStatusesPopoverContent = lazy(() => import("./select-exports-statuses-popover-content"))
//#endregion

const SelectStatusesPopover = ({ label, ...props }: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	const { t } = useTranslation("exports", { keyPrefix: "components.statusesPopover" })

	return (
		<ComboBox label={label ?? t("label")} {...props}>
			<ComboBox.Trigger>{t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}</ComboBox.Trigger>

			<ComboBox.Content className='h-[193px]'>
				<SelectExportsStatusesPopoverContent />
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectStatusesPopover
