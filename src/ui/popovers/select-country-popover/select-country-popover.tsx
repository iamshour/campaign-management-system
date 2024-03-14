//#region Import
import LucideChevronDown from "~icons/lucide/chevron-down"
import { forwardRef, lazy, Suspense, useState } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import Button from "../../button/button"
import Label from "../../label/label"
import Popover from "../../popover/popover"
import Skeleton from "../../skeleton/skeleton"
import isoCountryOptions from "../../utils/iso-country-options"

const SelectCountryPopoverContent = lazy(() => import("./select-country-popover-content"))

const MaterialSymbolsLock = lazy(() => import("~icons/material-symbols/lock"))

const FlagIcon = lazy(() => import("../../phone-input/flag-icon"))
//#endregion

interface SelectCountryPopoverProps
	extends Partial<Pick<React.ComponentPropsWithoutRef<typeof Button>, "aria-invalid" | "className" | "size">>,
		Omit<React.ComponentPropsWithoutRef<typeof SelectCountryPopoverContent>, "closePopover"> {
	label?: React.ReactNode | string
	readOnly?: boolean
	withPlaceholder?: boolean
}

const SelectCountryPopover = forwardRef<React.ElementRef<typeof Button>, SelectCountryPopoverProps>(
	(
		{
			"aria-invalid": invalid,
			className,
			label,
			options = isoCountryOptions,
			readOnly,
			size = "default",
			value,
			withPlaceholder = true,
			...props
		},
		ref
	) => {
		const { t } = useTranslation("ui")

		const [open, setOpen] = useState(false)

		return (
			<div className={twMerge("relative w-[340px] max-w-full", className)}>
				{!!label && (
					<Label aria-invalid={invalid} size={size}>
						{label}
					</Label>
				)}

				<Popover onOpenChange={setOpen} open={open}>
					<Popover.Trigger asChild>
						<Button
							aria-invalid={invalid}
							className={twMerge("w-full px-2", readOnly && "pointer-events-none")}
							hasValue={!!value?.length}
							ref={ref}
							size={size}
							variant='outline-grey'>
							<Suspense fallback={<Skeleton className='h-5 w-5' />}>
								<FlagIcon label={options.find((c) => c?.value === value)?.label ?? value} value={value} />
							</Suspense>
							{withPlaceholder &&
								(value?.length ? (
									<span className='flex-1 truncate px-2 text-start'>
										{options.find((c) => c?.value === value)?.label}
									</span>
								) : (
									<span className='flex-1 truncate px-2 text-start'>{t("selectCountryPopover.placeholder")}</span>
								))}

							{readOnly && <MaterialSymbolsLock className='h-4 w-4 shrink-0 text-[#9899A7]' />}

							{!readOnly && <LucideChevronDown className='h-4 w-4' />}
						</Button>
					</Popover.Trigger>

					<Popover.Content align='start' className='h-[297px] border border-gray-300 p-0'>
						<SelectCountryPopoverContent
							closePopover={() => setOpen(false)}
							options={options}
							value={value}
							{...props}
						/>
					</Popover.Content>
				</Popover>
			</div>
		)
	}
)

SelectCountryPopover.displayName = "SelectCountryPopover"

export default SelectCountryPopover
