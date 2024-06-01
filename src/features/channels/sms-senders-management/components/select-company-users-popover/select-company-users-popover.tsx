//#region Import
import { SelectAsyncPopover } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectCompanyUsersPopoverContent = lazy(() => import("./select-company-users-popover-content"))
//#endregion

type SelectCompanyUsersPopoverProps = React.ComponentPropsWithoutRef<typeof SelectAsyncPopover> & {
	companyId: string | undefined
}

const SelectCompanyUsersPopover = ({ companyId, placeholder, ...props }: SelectCompanyUsersPopoverProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "components.companyUsersPopover" })

	return (
		<SelectAsyncPopover placeholder={placeholder || `${t("placeholder")} *`} {...props}>
			{!!companyId && <SelectCompanyUsersPopoverContent companyId={companyId} />}
		</SelectAsyncPopover>
	)
}

export default SelectCompanyUsersPopover
