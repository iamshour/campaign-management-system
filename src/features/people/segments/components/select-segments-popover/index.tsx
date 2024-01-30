//#region Import
import ComboBox from "@package/ui/src/combo-box"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectSegmentsPopoverContent = lazy(() => import("./select-segments-popover-content"))
//#endregion

const SelectSegmentsPopover = ({ label, ...props }: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	const { t } = useTranslation("segments", { keyPrefix: "components.segmentsPopover" })

	return (
		<ComboBox label={label || t("label")} {...props}>
			<ComboBox.Trigger>{t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}</ComboBox.Trigger>

			<ComboBox.Content>
				<SelectSegmentsPopoverContent />
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectSegmentsPopover
