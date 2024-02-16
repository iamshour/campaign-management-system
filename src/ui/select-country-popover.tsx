//#region Import
import { Suspense, lazy, useLayoutEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { getCountryCallingCode, type Country } from "react-phone-number-input"
import { twMerge } from "tailwind-merge"

import Button from "./button"
import Command from "./command"
import Label from "./label"
import Popover from "./popover"
import Skeleton from "./skeleton"
import isoCountryOptions from "./utils/iso-country-options"

import LucideChevronDown from "~icons/lucide/chevron-down"

const FlagIcon = lazy(() => import("./phone-input/flag-icon"))
//#endregion

export type CountryOption = { label: string; value: Country }

interface SelectCountryPopoverProps<T extends Country>
	extends Partial<Pick<React.ComponentPropsWithoutRef<typeof Button>, "size" | "className">> {
	value: T
	onChange: (newCountry: T) => void
	options?: CountryOption[]
	withPlaceholder?: boolean
	withCountryCode?: boolean
	label?: string
}

const SelectCountryPopover = ({
	value,
	onChange,
	options = isoCountryOptions,
	withPlaceholder = true,
	withCountryCode = false,
	label,
	size = "default",
	className,
}: SelectCountryPopoverProps<Country>) => {
	const { t } = useTranslation("ui")

	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	useLayoutEffect(() => {
		if (open) {
			setLoading(true)
			const timer = setTimeout(() => setLoading(false), 1)
			return () => clearTimeout(timer)
		}
	}, [open])

	return (
		<div className={twMerge("relative w-[340px] max-w-full", className)}>
			{!!label?.length && <Label size={size as "lg" | "default"}>{label}</Label>}

			<Popover open={open} onOpenChange={setOpen}>
				<Popover.Trigger asChild>
					<Button variant='outline-grey' hasValue={!!value?.length} className='w-full px-2' size={size}>
						<Suspense fallback={<Skeleton className='h-5 w-5' />}>
							<FlagIcon value={value} label={options.find((c) => c?.value === value)?.label ?? value} />
						</Suspense>
						{withPlaceholder && (
							<span className='flex-1 truncate px-2 text-start text-gray-500'>
								{value?.length ? options.find((c) => c?.value === value)?.label : t("selectCountryPopover.placeholder")}
							</span>
						)}
						<LucideChevronDown className='h-4 w-4' />
					</Button>
				</Popover.Trigger>

				<Popover.Content className='border border-gray-300 p-0' align='start'>
					<Command>
						<Command.Input placeholder={t("comboBox.placeholder")} />
						<Command.List>
							{loading ? (
								<>
									<Command.Loading>
										<div className='flex h-full min-h-[250px] w-full flex-1 flex-col gap-1.5 p-2'>
											{Array.from({ length: 7 }, (_, i) => (
												<Skeleton key={i} className='h-7 w-full' />
											))}
										</div>
									</Command.Loading>
								</>
							) : (
								<>
									<Command.Empty className='min-h-[250px] w-full flex-center'>
										{t("comboBox.message.noResults")}
									</Command.Empty>
									<Command.Group>
										{options
											.filter(({ label }) => label.toLocaleLowerCase() !== "international")
											.map((option, idx) => (
												<Command.Item
													key={`${value}-${idx}`}
													onSelect={() => onChange(option.value)}
													className={twMerge(
														"flex gap-2 transition-basic",
														option.value === value && "pointer-events-none bg-primary-50"
													)}>
													<Suspense fallback={<Skeleton className='h-5 w-5' />}>
														<FlagIcon {...option} />
													</Suspense>
													<span className='truncate font-medium'>{option.label}</span>
													{withCountryCode && (
														<span className='truncate'>+ {getCountryCallingCode(option?.value)}</span>
													)}
												</Command.Item>
											))}
									</Command.Group>
								</>
							)}
						</Command.List>
					</Command>
				</Popover.Content>
			</Popover>
		</div>
	)
}

export default SelectCountryPopover
