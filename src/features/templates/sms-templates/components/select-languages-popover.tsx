//#region Import
import { ComboBox, ComboBoxPopper } from "@/ui"

import smsTemplateLanguagesOptions from "../constants/sms-template-languages-options"
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

			<ComboBox.Content className='h-[193px]'>
				<ComboBoxPopper
					// label: t(label) // TODO: add translation
					options={smsTemplateLanguagesOptions}
				/>
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectLanguagesPopover
