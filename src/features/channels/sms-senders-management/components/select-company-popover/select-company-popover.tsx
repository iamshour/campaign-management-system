//#region Import
import { SelectAsyncPopover } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectCompanyPopoverContent = lazy(() => import("./select-company-popover-content"))
//#endregion

const SelectCompanyPopover = ({ placeholder, ...props }: React.ComponentPropsWithoutRef<typeof SelectAsyncPopover>) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "components.companyPopover" })

	return (
		<SelectAsyncPopover placeholder={placeholder || `${t("placeholder")} *`} {...props}>
			<SelectCompanyPopoverContent />
		</SelectAsyncPopover>
	)
}

export default SelectCompanyPopover
