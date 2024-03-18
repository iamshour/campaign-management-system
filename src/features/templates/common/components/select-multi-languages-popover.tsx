//#region Import
import { Label, SelectMultiOptionsPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import type { TemplateLanguage } from "../types"

import templateLanguagesLocaleMap from "../constants/template-languages-local-map"
import templateLanguagesOptions from "../constants/template-languages-options"
//#endregion

interface SelectMultiLanguagesPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof SelectMultiOptionsPopover>, "options" | "value"> {
	label?: string
	value?: TemplateLanguage[]
}

const SelectMultiLanguagesPopover = ({ label, placeholder, value, ...props }: SelectMultiLanguagesPopoverProps) => {
	const { t } = useTranslation("templates-common")

	return (
		<div className='relative w-full max-w-[340px]'>
			<Label>{label || t("components.selectMultiLanguagesPopover.label")}</Label>

			<SelectMultiOptionsPopover
				options={templateLanguagesOptions.map(({ label, value }) => ({ label: t(label), value }))}
				placeholder={placeholder ?? t("components.selectMultiLanguagesPopover.placeholder")}
				value={
					value?.length
						? value?.map((op) => ({ label: t(templateLanguagesLocaleMap[op as TemplateLanguage]), value: op }))
						: []
				}
				{...props}
			/>
		</div>
	)
}

export default SelectMultiLanguagesPopover
