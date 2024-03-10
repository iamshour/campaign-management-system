//#region Import
import { SelectMultiOptionsPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import templateLanguagesOptions from "../constants/template-languages-options"
//#endregion

const SelectMultiLanguagesPopover = ({
	label,
	...props
}: Omit<React.ComponentPropsWithoutRef<typeof SelectMultiOptionsPopover>, "options">) => {
	const { t } = useTranslation("templates-common")

	return (
		<SelectMultiOptionsPopover
			{...props}
			label={label || t("components.selectMultiLanguagesPopover.label")}
			options={templateLanguagesOptions.map(({ label, value }) => ({ label: t(label), value }))}
			placeholder={t("components.selectMultiLanguagesPopoverplaceholder")}
		/>
	)
}

export default SelectMultiLanguagesPopover
