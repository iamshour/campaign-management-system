//#region Import
import { SelectMultiOptionsPopover } from "@/ui"
import { Label } from "@radix-ui/react-label"
import { useTranslation } from "react-i18next"

import exportsStatusesOptions from "../constants/exports-statuses-options"
//#endregion

interface SelectMultiExportsStatusesPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof SelectMultiOptionsPopover>, "options"> {
	label?: string
}
const SelectMultiExportsStatusesPopover = ({ label, ...props }: SelectMultiExportsStatusesPopoverProps) => {
	const { t } = useTranslation("exports")

	return (
		<div className='relative w-full max-w-[340px]'>
			<Label>{label || t("components.selectMultiExportsStatusesPopover.label")}</Label>

			<SelectMultiOptionsPopover
				{...props}
				options={exportsStatusesOptions?.map((op) => ({ ...op, label: t(op.label) }))}
				placeholder={t("components.selectMultiExportsStatusesPopover.placeholder")}
			/>
		</div>
	)
}

export default SelectMultiExportsStatusesPopover
