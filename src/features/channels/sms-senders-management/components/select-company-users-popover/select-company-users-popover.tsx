//#region Import
import { ComboBox } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectCompanyUsersPopoverContent = lazy(() => import("./select-company-users-popover-content"))
//#endregion

type SelectCompanyUsersPopoverProps = React.ComponentPropsWithoutRef<typeof ComboBox> & {
	companyId: string | undefined
}

const SelectCompanyUsersPopover = ({ companyId, label, ...props }: SelectCompanyUsersPopoverProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "components.companyUsersPopover" })

	return (
		<ComboBox className='w-[340px] max-w-full' label={label || `${t("label")} *`} {...props}>
			<ComboBox.Trigger>{t("placeholder")}</ComboBox.Trigger>

			<ComboBox.Content>{!!companyId && <SelectCompanyUsersPopoverContent companyId={companyId} />}</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectCompanyUsersPopover
