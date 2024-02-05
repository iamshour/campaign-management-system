//#region Import
import smsTemplatesTypeOptions from "@/features/templates/sms-templates/constants/sms-templates-type-options"
import { ComboBox, ComboBoxPopper } from "@/ui"
//#endregion

const SelectTypesPopover = ({
	// label,
	...props
}: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	return (
		<ComboBox
			label='Type' // label={label ?? t("label")} // TODO: add translation
			{...props}>
			<ComboBox.Trigger>Select types</ComboBox.Trigger>

			<ComboBox.Content>
				<ComboBoxPopper
					options={Object.entries(smsTemplatesTypeOptions)?.map(([value, label]) => ({
						value,
						label: label, // label: t(label) // TODO: add translation
					}))}
				/>
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectTypesPopover
