//#region Import
import SingleSelectPopover from "@/core/components/select-single-option-popover"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { useTranslation } from "react-i18next"

import type { TemplateType } from "../types"

import templateTypesOptions from "../constants/template-types-options"
//#endregion

interface SelectSingleTemplateTypeProps<T extends TemplateType | undefined>
	extends Omit<
		React.ComponentPropsWithoutRef<typeof SingleSelectPopover>,
		"className" | "contentProps" | "onValueChange" | "options" | "triggerProps" | "value"
	> {
	onValueChange: (selectedType: T) => void
	readOnly?: boolean
	value: T
}

const SelectSingleTemplateType = ({ readOnly, ...props }: SelectSingleTemplateTypeProps<TemplateType | undefined>) => {
	const { t } = useTranslation()

	return (
		<SingleSelectPopover
			{...props}
			options={templateTypesOptions.map(({ label, value }) => ({
				children: (
					<span title='Lorem ipsum dolor sit amet consectetur adipisicing elit.'>
						<MdiInformationVariantCircle className='text-sm text-primary-600' />
					</span>
				),
				label: t(label),
				showCheck: false,
				value: value,
			}))}
			triggerProps={{
				className: "text-base",
				readOnly,
			}}
		/>
	)
}

export default SelectSingleTemplateType
