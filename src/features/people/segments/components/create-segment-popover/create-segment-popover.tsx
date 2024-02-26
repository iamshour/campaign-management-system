//#region Import
import { Button, Popover, PopoverSkeleton, Tooltip } from "@/ui"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { lazy, Suspense, useState } from "react"
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
			{/* Note: Move Trigger to Component where it's used and pass it as child if this popover will be re-used again. */}
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

					<Tooltip>
						<Tooltip.Trigger asChild className='w-max'>
							<div>
								<MdiInformationVariantCircle className='shrink-0 text-xl text-primary-600' />
							</div>
						</Tooltip.Trigger>
						<Tooltip.Content
							align='start'
							alignOffset={-110}
							content={t("segment.addSegment.tooltip")}
							side='top'
							sideOffset={14}
						/>
					</Tooltip>
				</Button>
			</Popover.Trigger>
			<Popover.Content align='start' alignOffset={0} side='top' sideOffset={10}>
				<Suspense fallback={<PopoverSkeleton />}>
					<CreateSegmentPopoverContent onClose={() => setIsOpen(false)} />
				</Suspense>
			</Popover.Content>
		</Popover>
	)
}

export default CreateSegmentPopover
