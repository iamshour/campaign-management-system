//#region Import
import { useTranslation } from "react-i18next"

import smsTemplatesTypeOptions from "@/features/templates/sms-templates/constants/sms-templates-type-options"
import { ComboBox, ComboBoxPopper } from "@/ui"
//#endregion

const SelectTypesPopover = ({
	// label,
	...props
}: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	const { t } = useTranslation("sms-templates")

	return (
		<ComboBox
			label='Type' // label={label ?? t("label")} // TODO: add translation
			{...props}>
			<ComboBox.Trigger>{t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}</ComboBox.Trigger>

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
