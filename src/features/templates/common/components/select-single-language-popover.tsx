//#region Import
import { SelectSingleOptionPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import type { TemplateType } from "../types"

import templateLanguagesOptions from "../constants/template-languages-options"
//#endregion

interface SelectSingleLanguagePopoverProps
	extends Omit<
		React.ComponentPropsWithoutRef<typeof SelectSingleOptionPopover<TemplateType>>,
		"className" | "options" | "triggerProps"
	> {
	readOnly?: boolean
}

const SelectSingleLanguagePopover = ({ placeholder, readOnly, ...props }: SelectSingleLanguagePopoverProps) => {
	const { t } = useTranslation("templates-common")

	return (
		<SelectSingleOptionPopover
			{...props}
			options={templateLanguagesOptions.map(({ label, value }) => ({ label: t(label), value }))}
			placeholder={placeholder || t("components.selectSingleLanguagePopover.placeholder")}
			triggerProps={{ className: "text-base", readOnly }}
		/>
	)
}

export default SelectSingleLanguagePopover
