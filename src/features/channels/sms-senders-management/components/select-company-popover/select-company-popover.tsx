//#region Import
import { ComboBox } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectCompanyPopoverContent = lazy(() => import("./select-company-popover-content"))
//#endregion

const SelectCompanyPopover = ({ label, ...props }: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "components.companyPopover" })

	return (
		<ComboBox label={label || t("label")} {...props}>
			<ComboBox.Trigger>{t("placeholder")}</ComboBox.Trigger>

			<ComboBox.Content>
				<SelectCompanyPopoverContent />
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectCompanyPopover
