//#region Import
import { Button, twMerge, Popover, PopoverSkeleton, Tooltip } from "@blueai/ui"
import { useState, Suspense, lazy } from "react"
import { useTranslation } from "react-i18next"

import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"

const CreateSegmentPopoverContent = lazy(() => import("./create-segment-popover-content"))
//#endregion

export interface CreateSegmentPopoverProps {
	disabled?: boolean
}

const CreateSegmentPopover = ({ disabled }: CreateSegmentPopoverProps) => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.advancedFilters" })

	const [isOpen, setIsOpen] = useState(false)

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			{/* Note: Move Trigger to Component where it's used and pass it as child if this popover will be re-used again. */}
			<Popover.Trigger asChild>
				<Button
					type='button'
					variant='outline'
					disabled={disabled}
					className={twMerge(
						"!pointer-events-auto !cursor-pointer !opacity-100",
						disabled && "!cursor-auto !border-[#4cb0e67a]/50 !bg-transparent !opacity-100"
					)}>
					<span className={disabled ? "!opacity-50" : ""}>{t("segment.addSegment.buttonLabel")}</span>

					<Tooltip>
						<Tooltip.Trigger asChild className='w-max'>
							<div>
								<MdiInformationVariantCircle className='shrink-0 text-xl text-primary-600' />
							</div>
						</Tooltip.Trigger>
						<Tooltip.Content
							content={t("segment.addSegment.tooltip")}
							side='top'
							align='start'
							alignOffset={-110}
							sideOffset={14}
						/>
					</Tooltip>
				</Button>
			</Popover.Trigger>
			<Popover.Content side='top' align='start' sideOffset={10} alignOffset={0}>
				<Suspense fallback={<PopoverSkeleton />}>
					<CreateSegmentPopoverContent onClose={() => setIsOpen(false)} />
				</Suspense>
			</Popover.Content>
		</Popover>
	)
}

export default CreateSegmentPopover
