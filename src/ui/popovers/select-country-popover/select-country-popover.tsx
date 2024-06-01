//#region Import
import LucideChevronDown from "~icons/lucide/chevron-down"
import { forwardRef, lazy, Suspense, useState } from "react"
import { twMerge } from "tailwind-merge"

import type { CommonSelectPopoverProps } from "../types"
import type { SelectCountryPopoverContentProps } from "./select-country-popover-content"

import Button from "../../button/button"
import Label from "../../label/label"
import Popover from "../../popover/popover"
import Skeleton from "../../skeleton/skeleton"
import isoCountryOptions from "../../utils/iso-country-options"
import SelectCountryPopoverTrigger from "./select-country-popover-trigger"

const SelectCountryPopoverContent = lazy(() => import("./select-country-popover-content"))

const MaterialSymbolsLock = lazy(() => import("~icons/material-symbols/lock"))

const FlagIcon = lazy(() => import("../../phone-input/flag-icon"))
//#endregion

export type SelectCountryPopoverProps = CommonSelectPopoverProps & {
	className?: string
	label?: React.ReactNode | string
	readOnly?: boolean
	required?: boolean
	withFallback?: boolean
	withPlaceholder?: boolean
} & SelectCountryPopoverContentProps

const SelectCountryPopover = forwardRef<React.ElementRef<typeof Button>, SelectCountryPopoverProps>(
	(
		{
			"aria-invalid": invalid,
			className,
			contentProps,
			label,
			options = isoCountryOptions,
			readOnly,
			required,
			size = "default",
			triggerProps,
			withFallback = false,
			withPlaceholder = true,
			...props
		},
		ref
	) => {
		const [open, setOpen] = useState(false)

		const { isMulti, value } = props

		return (
			<div className={twMerge("relative w-[340px] max-w-full", className)}>
				{!!label && (
					<Label aria-invalid={invalid} required={required} size={size}>
						{label}
					</Label>
				)}

				<Popover onOpenChange={setOpen} open={open}>
					<Popover.Trigger asChild>
						<Button
							aria-invalid={invalid}
							hasValue={!!value?.length}
							ref={ref}
							size={size}
							variant='outline-grey'
							{...triggerProps}
							className={twMerge(
								"w-full px-3 font-normal",
								readOnly && "pointer-events-none",
								triggerProps?.className
							)}>
							{!isMulti && (
								<Suspense fallback={<Skeleton className='h-5 w-5' />}>
									<FlagIcon
										label={options.find((c) => c?.value === value)?.label ?? value}
										value={value}
										withFallback={withFallback}
									/>
								</Suspense>
							)}

							{withPlaceholder && (
								<div className='h-full flex-1 truncate py-2.5 text-start'>
									<div className='flex h-full items-center gap-1'>
										<SelectCountryPopoverTrigger options={options} {...props} />
									</div>
								</div>
							)}

							{readOnly && <MaterialSymbolsLock className='h-4 w-4 shrink-0 text-[#9899A7]' />}
							{!readOnly && <LucideChevronDown className='h-4 w-4' />}
						</Button>
					</Popover.Trigger>

					<Popover.Content
						align='start'
						{...contentProps}
						className={twMerge("h-[297px] border border-gray-300 p-0", contentProps?.className)}>
						<SelectCountryPopoverContent closePopover={() => setOpen(false)} options={options} {...props} />
					</Popover.Content>
				</Popover>
			</div>
		)
	}
)

SelectCountryPopover.displayName = "SelectCountryPopover"

export default SelectCountryPopover
