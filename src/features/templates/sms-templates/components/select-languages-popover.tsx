//#region Import
import { useTranslation } from "react-i18next"

import smsTemplatesLanguageOptions from "@/features/templates/sms-templates/constants/sms-templates-language-options"
import { ComboBox, ComboBoxPopper } from "@/ui"
//#endregion

const SelectLanguagesPopover = ({
	// label,
	...props
}: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	const { t } = useTranslation("sms-templates")

	return (
		<ComboBox
			// TODO: add translation
			label='Language'
			{...props}>
			<ComboBox.Trigger>{t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}</ComboBox.Trigger>

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
