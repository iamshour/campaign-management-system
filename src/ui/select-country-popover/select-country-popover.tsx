//#region Import
import LucideChevronDown from "~icons/lucide/chevron-down"
import { lazy, Suspense, useState } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import Button from "../button/button"
import Label from "../label/label"
import Popover from "../popover/popover"
import Skeleton from "../skeleton/skeleton"
import isoCountryOptions from "../utils/iso-country-options"

const SelectCountryPopoverContent = lazy(() => import("./select-country-popover-content"))

const FlagIcon = lazy(() => import("../phone-input/flag-icon"))
//#endregion

interface SelectCountryPopoverProps
	extends Partial<Pick<React.ComponentPropsWithoutRef<typeof Button>, "className" | "size">>,
		Omit<React.ComponentPropsWithoutRef<typeof SelectCountryPopoverContent>, "closePopover"> {
	label?: string
	withPlaceholder?: boolean
}

const SelectCountryPopover = ({
	className,
	label,
	options = isoCountryOptions,
	size = "default",
	value,
	withPlaceholder = true,
	...props
}: SelectCountryPopoverProps) => {
	const { t } = useTranslation("ui")

	const [open, setOpen] = useState(false)

	return (
		<div className={twMerge("relative w-[340px] max-w-full", className)}>
			{!!label?.length && <Label size={size}>{label}</Label>}

			<Popover onOpenChange={setOpen} open={open}>
				<Popover.Trigger asChild>
					<Button className='w-full px-2' hasValue={!!value?.length} size={size} variant='outline-grey'>
						<Suspense fallback={<Skeleton className='h-5 w-5' />}>
							<FlagIcon label={options.find((c) => c?.value === value)?.label ?? value} value={value} />
						</Suspense>
						{withPlaceholder &&
							(value?.length ? (
								<span className='flex-1 truncate px-2 text-start'>
									{options.find((c) => c?.value === value)?.label}
								</span>
							) : (
								<span className='flex-1 truncate px-2 text-start font-normal text-[#9899A7]'>
									{t("selectCountryPopover.placeholder")}
								</span>
							))}
						<LucideChevronDown className='h-4 w-4' />
					</Button>
				</Popover.Trigger>

				<Popover.Content align='start' className='h-[297px] border border-gray-300 p-0'>
					<SelectCountryPopoverContent closePopover={() => setOpen(false)} options={options} value={value} {...props} />
				</Popover.Content>
			</Popover>
		</div>
	)
}

export default SelectCountryPopover
