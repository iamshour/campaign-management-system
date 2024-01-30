//#region Import
import ComboBox from "@package/ui/src/combo-box"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectStatusesPopoverContent = lazy(() => import("./select-statuses-popover-content"))
//#endregion

interface SelectStatusesPopoverProps
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

const SelectStatusesPopover = ({
	selectedOptions,
	updateSelectedOptions,
	label,
	...props
}: SelectStatusesPopoverProps) => {
	const { t } = useTranslation("exports", { keyPrefix: "components.statusesPopover" })

	return (
		<ComboBox
			label={label ?? t("label")}
			selectedOptions={selectedOptions?.map((op) => ({ label: op, value: op }))}
			updateSelectedOptions={(options) => updateSelectedOptions(options?.map(({ value }) => value))}
			{...props}>
			<ComboBox.Trigger>{t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}</ComboBox.Trigger>

			<ComboBox.Content>
				<SelectStatusesPopoverContent />
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectStatusesPopover
