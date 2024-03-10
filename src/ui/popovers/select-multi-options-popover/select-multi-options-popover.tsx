//#region Import
import LucideChevronDown from "~icons/lucide/chevron-down"
import { twMerge } from "tailwind-merge"

import Button from "../../button/button"
import Label from "../../label/label"
import Popover from "../../popover/popover"
import MultiBadegesPreview from "../select-async-options-popover/multi-badges-preview"
import SelectMultiOptionsPopoverContent from "./select-multi-options-popover-content"
//#endregion

interface SelectMultiOptionsPopoverProps
	extends React.ComponentPropsWithoutRef<typeof SelectMultiOptionsPopoverContent> {
	className?: string

	contentProps?: React.ComponentPropsWithoutRef<typeof Popover.Content>

	label?: string

	placeholder?: React.ReactNode | string

	required?: boolean

	size?: React.ComponentPropsWithoutRef<typeof Button>["size"]

	triggerProps?: React.ComponentPropsWithoutRef<typeof Button>
}

const SelectMultiOptionsPopover = ({
	className,
	contentProps,
	label,
	placeholder = "Select Options",
	required,
	size,
	triggerProps,
	value,
	...props
}: SelectMultiOptionsPopoverProps) => {
	return (
		<div className={twMerge("relative w-full max-w-[340px]", className)}>
			{!!label?.length && (
				<Label size={size}>
					{label} {required && "*"}
				</Label>
			)}

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
								{!value?.length ? placeholder : <MultiBadegesPreview selection={value} size={size} />}
							</div>
						</div>

						<LucideChevronDown className='h-4 w-4' />
					</Button>
				</Popover.Trigger>

				<Popover.Content align='start' {...contentProps} className={twMerge("p-1", contentProps?.className)}>
					<SelectMultiOptionsPopoverContent value={value} {...props} />
				</Popover.Content>
			</Popover>
		</div>
	)
}

export default SelectMultiOptionsPopover
