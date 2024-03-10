//#region Import
import { SelectAsyncOptionsPopover } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectCompanyUsersPopoverContent = lazy(() => import("./select-company-users-popover-content"))
//#endregion

type SelectCompanyUsersPopoverProps = React.ComponentPropsWithoutRef<typeof SelectAsyncOptionsPopover> & {
	companyId: string | undefined
}

const SelectCompanyUsersPopover = ({ companyId, label, placeholder, ...props }: SelectCompanyUsersPopoverProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "components.companyUsersPopover" })

	return (
		<SelectAsyncOptionsPopover
			className='w-[340px] max-w-full'
			label={label || `${t("label")} *`}
			placeholder={placeholder || `${t("placeholder")} *`}
			{...props}>
			{!!companyId && <SelectCompanyUsersPopoverContent companyId={companyId} />}
		</SelectAsyncOptionsPopover>
	)
}

export default SelectCompanyUsersPopover
