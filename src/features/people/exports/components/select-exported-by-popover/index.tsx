//#region Import
import ComboBox from "@package/ui/src/combo-box"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectExportedByPopoverContent = lazy(() => import("./select-exported-by-popover-content"))
//#endregion

interface SelectExportedByPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof ComboBox>, "selectedOptions" | "updateSelectedOptions"> {
	/**
	 * List of selected strings resembling selected Options @template string[]
	 */
	selectedOptions: string[]

	/**
	 * Callback Function that updates selected options, that takes a list of strings as its first param
	 * @param options List of options @template string[]
	 */
	updateSelectedOptions: (options: string[]) => void
}

const SelectExportedByPopover = ({
	selectedOptions,
	updateSelectedOptions,
	label,
	...props
}: SelectExportedByPopoverProps) => {
	const { t } = useTranslation("exports", { keyPrefix: "components.exportedByPopover" })

	return (
		<ComboBox
			label={label ?? t("label")}
			selectedOptions={selectedOptions?.map((op) => ({ label: op, value: op }))}
			updateSelectedOptions={(options) => updateSelectedOptions(options?.map(({ value }) => value))}
			{...props}>
			<ComboBox.Trigger>{t("placeholder")}</ComboBox.Trigger>

			<ComboBox.Content>
				<SelectExportedByPopoverContent />
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectExportedByPopover
