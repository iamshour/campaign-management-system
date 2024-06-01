//#region Import
import LucideChevronDown from "~icons/lucide/chevron-down"
import { twMerge } from "tailwind-merge"

import type { CommonSelectPopoverProps } from "../types"

import Button from "../../button/button"
import Popover from "../../popover/popover"
import MultiBadgesPreview from "../select-async-popover/multi-badges-preview"
import SelectMultiOptionsPopoverContent from "./select-multi-options-popover-content"
//#endregion

export interface SelectMultiOptionsPopoverProps
	extends CommonSelectPopoverProps,
		React.ComponentPropsWithoutRef<typeof SelectMultiOptionsPopoverContent> {}

const SelectMultiOptionsPopover = ({
	contentProps,
	placeholder = "Select Options",
	size,
	triggerProps,
	value,
	...props
}: SelectMultiOptionsPopoverProps) => {
	return (
		<Popover>
			<Popover.Trigger asChild>
				<Button
					hasValue={!!value?.length}
					size={size}
					variant='outline-grey'
					{...triggerProps}
					className={twMerge(
						"w-full justify-between overflow-hidden py-0 !font-normal",
						size === "lg" ? "text-base" : "px-3 text-sm",
						triggerProps?.className
					)}>
					<div className='h-full flex-1 truncate py-2.5 text-start'>
						<div className='flex h-full items-center gap-1'>
							<MultiBadgesPreview placeholder={placeholder} selection={value} size={size} />
						</div>
					</div>

					<LucideChevronDown className='h-4 w-4' />
				</Button>
			</Popover.Trigger>

			<Popover.Content align='start' {...contentProps} className={twMerge("p-1", contentProps?.className)}>
				<SelectMultiOptionsPopoverContent value={value} {...props} />
			</Popover.Content>
		</Popover>
	)
}

export default SelectMultiOptionsPopover
