//#region Import
import { MultiSelectPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import templateLanguagesOptions from "../constants/template-languages-options"
//#endregion

const SelectMultiLanguagesPopover = ({
	label,
	...props
}: Omit<React.ComponentPropsWithoutRef<typeof MultiSelectPopover>, "options">) => {
	const { t } = useTranslation("templates-common", { keyPrefix: "components.selectMultiLanguagesPopover" })

	return (
		<MultiSelectPopover
			{...props}
			label={label || t("label")}
			options={templateLanguagesOptions}
			placeholder={t("placeholder")}
		/>
	)
}

export default SelectMultiLanguagesPopover
