//#region Import
import smsTemplatesLanguageOptions from "@/features/templates/sms-templates/constants/sms-templates-language-options"
import { ComboBox, ComboBoxPopper } from "@/ui"
//#endregion

const SelectLanguagesPopover = ({
	// label,
	...props
}: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	return (
		<ComboBox
			// TODO: add translation
			label='Language'
			{...props}>
			<ComboBox.Trigger>Select languages</ComboBox.Trigger>

			<ComboBox.Content>
				<ComboBoxPopper
					options={Object.entries(smsTemplatesLanguageOptions)?.map(([value, label]) => ({
						value,
						label: label, // label: t(label) // TODO: add translation
					}))}
				/>
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectLanguagesPopover
