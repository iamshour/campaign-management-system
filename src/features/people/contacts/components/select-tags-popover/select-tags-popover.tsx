//#region Import
import { Label, SelectAsyncPopover } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

const SelectTagsPopoverContent = lazy(() => import("./select-tags-popover-content"))
//#endregion

type SelectTagsPopoverProps = React.ComponentPropsWithoutRef<typeof SelectAsyncPopover> & {
	className?: string
	label?: string
}

const SelectTagsPopover = ({ className, label, placeholder, size, ...props }: SelectTagsPopoverProps) => {
	const { t } = useTranslation("contacts", { keyPrefix: "components.tagsPopover" })

	return (
		<div className={twMerge("relative w-full ", label && "max-w-[340px]", className)}>
			{label && <Label size={size}>{label}</Label>}

			<SelectAsyncPopover
				placeholder={placeholder ?? t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}
				size={size}
				{...props}>
				<SelectTagsPopoverContent />
			</SelectAsyncPopover>
		</div>
	)
}

export default SelectTagsPopover
