//#region Import
import { ComboBox, ComboBoxPopper } from "@/ui"

import smsTemplateStatusesOptions from "../constants/sms-template-statuses-options"
//#endregion

const SelectStatusesPopover = ({
	// label,
	...props
}: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	return (
		<ComboBox
			label='Status' // label={label ?? t("label")} // TODO: add translation
			{...props}>
			<ComboBox.Trigger>Select status</ComboBox.Trigger>

			<ComboBox.Content className='h-[119px]'>
				<ComboBoxPopper options={smsTemplateStatusesOptions} />
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectStatusesPopover
