//#region Import
import { ComboBox, ComboBoxPopper } from "@/ui"

import templateTypesOptions from "../constants/template-types-options"
//#endregion

const SelectTemplateTypesPopover = ({
	// label,
	...props
}: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	return (
		<ComboBox label='Type' {...props}>
			<ComboBox.Trigger>Select types</ComboBox.Trigger>

			<ComboBox.Content className='h-[193px]'>
				<ComboBoxPopper options={templateTypesOptions} />
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectTemplateTypesPopover
