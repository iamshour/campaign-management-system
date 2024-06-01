//#region Import
import { Label, SelectAsyncPopover } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

const SelectGroupsPopoverContent = lazy(() => import("./select-groups-popover-content"))

//#endregion
type SelectGroupsPopoverProps = React.ComponentPropsWithoutRef<typeof SelectAsyncPopover> & {
	className?: string
	label?: string
}

const SelectGroupsPopover = ({ className, label, size, ...props }: SelectGroupsPopoverProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "components.groupsPopover" })

	return (
		<div className={twMerge("relative w-full ", label && "max-w-[340px]", className)}>
			{label && <Label size={size}>{label}</Label>}

			<SelectAsyncPopover
				placeholder={t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}
				size={size}
				{...props}>
				<SelectGroupsPopoverContent />
			</SelectAsyncPopover>
		</div>
	)
}

export default SelectGroupsPopover
