//#region Import
import { SelectSingleOptionPopover } from "@/ui"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { useTranslation } from "react-i18next"

import type { TemplateType } from "../types"

import templateTypesOptions from "../constants/template-types-options"
//#endregion

interface SelectSingleTemplateTypePopoverProps
	extends Omit<
		React.ComponentPropsWithoutRef<typeof SelectSingleOptionPopover<TemplateType>>,
		"className" | "options" | "triggerProps"
	> {
	readOnly?: boolean
}

const SelectSingleTemplateTypePopover = ({
	label,
	placeholder,
	readOnly,
	...props
}: SelectSingleTemplateTypePopoverProps) => {
	const { t } = useTranslation("templates-common")

	return (
		<SelectSingleOptionPopover
			{...props}
			label={label || `${t("components.selectSingleTemplateTypePopover.label")}`}
			options={templateTypesOptions.map(({ label, value }) => ({
				children: (
					<span title='Lorem ipsum dolor sit amet consectetur adipisicing elit.'>
						<MdiInformationVariantCircle className='text-sm text-primary-600' />
					</span>
				),
				label: t(label),
				showCheck: false,
				value,
			}))}
			placeholder={placeholder || t("components.selectSingleTemplateTypePopover.placeholder")}
			triggerProps={{ className: "text-base", readOnly }}
		/>
	)
}

export default SelectSingleTemplateTypePopover
