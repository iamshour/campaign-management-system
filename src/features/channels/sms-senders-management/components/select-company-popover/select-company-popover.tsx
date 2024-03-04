//#region Import
import { ComboBox } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectCompanyPopoverContent = lazy(() => import("./select-company-popover-content"))
//#endregion

const SelectCompanyPopover = ({ label, ...props }: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "components.companyPopover" })

	return (
		<ComboBox className='w-[340px] max-w-full' label={label || t("label")} {...props}>
			<ComboBox.Trigger>{t("placeholder")}</ComboBox.Trigger>

			<ComboBox.Content>
				<SelectCompanyPopoverContent />
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectCompanyPopover
