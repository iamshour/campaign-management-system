//#region Import
import { SelectAsyncOptionsPopover } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectCompanyPopoverContent = lazy(() => import("./select-company-popover-content"))
//#endregion

const SelectCompanyPopover = ({
	label,
	placeholder,
	...props
}: React.ComponentPropsWithoutRef<typeof SelectAsyncOptionsPopover>) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "components.companyPopover" })

	return (
		<SelectAsyncOptionsPopover
			className='w-[340px] max-w-full'
			label={label || `${t("label")} *`}
			placeholder={placeholder || `${t("placeholder")} *`}
			{...props}>
			<SelectCompanyPopoverContent />
		</SelectAsyncOptionsPopover>
	)
}

export default SelectCompanyPopover
