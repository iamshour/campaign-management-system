//#region Import
import { ComboBox, ComboBoxPopper } from "@/ui"

import smsTemplateTypesOptions from "../constants/sms-template-types-options"
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

			<ComboBox.Content className='h-[151px]'>
				<ComboBoxPopper options={smsTemplateTypesOptions} />
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectTypesPopover
