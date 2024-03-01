//#region Import
import { MultiSelectPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import templateStatusesOptions from "../constants/template-statuses-options"
//#endregion

const SelectMultiTemplateStatusesPopover = ({
	label,
	...props
}: Omit<React.ComponentPropsWithoutRef<typeof MultiSelectPopover>, "options">) => {
	const { t } = useTranslation("templates-common", { keyPrefix: "components.selectMultiTemplateStatusesPopover" })

	return (
		<MultiSelectPopover
			{...props}
			label={label || t("label")}
			options={templateStatusesOptions}
			placeholder={t("placeholder")}
		/>
	)
}

export default SelectMultiTemplateStatusesPopover
