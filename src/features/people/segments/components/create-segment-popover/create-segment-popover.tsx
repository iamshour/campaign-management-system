//#region Import
import IconTooltip from "@/core/components/icon-tooltip/icon-tooltip"
import { Button, Popover } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

const CreateSegmentPopoverContent = lazy(() => import("./create-segment-popover-content"))
//#endregion

export interface CreateSegmentPopoverProps {
	disabled?: boolean
}

const CreateSegmentPopover = ({ disabled }: CreateSegmentPopoverProps) => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.advancedFilters" })

	const [isOpen, setIsOpen] = useState(false)

	return (
		<Popover onOpenChange={setIsOpen} open={isOpen}>
			<Popover.Trigger asChild>
				<Button
					className={twMerge(
						"!pointer-events-auto !cursor-pointer !opacity-100",
						disabled && "!cursor-auto !border-[#4cb0e67a]/50 !bg-transparent !opacity-100"
					)}
					disabled={disabled}
					type='button'
					variant='outline'>
					<span className={disabled ? "!opacity-50" : ""}>{t("segment.addSegment.buttonLabel")}</span>

					<IconTooltip alignOffset={-110} content={t("segment.addSegment.tooltip")} sideOffset={20} />
				</Button>
			</Popover.Trigger>
			<Popover.Content align='start' alignOffset={0} side='top' sideOffset={10}>
				<CreateSegmentPopoverContent onClose={() => setIsOpen(false)} />
			</Popover.Content>
		</Popover>
	)
}

export default CreateSegmentPopover
