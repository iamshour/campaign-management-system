//#region Import
import LucideChevronDown from "~icons/lucide/chevron-down"
import { lazy, Suspense, useLayoutEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { type Country, getCountryCallingCode } from "react-phone-number-input"
import { twMerge } from "tailwind-merge"

import Button from "../button/button"
import Command from "../command/command"
import Label from "../label/label"
import Popover from "../popover/popover"
import Skeleton from "../skeleton/skeleton"
import isoCountryOptions from "../utils/iso-country-options"

const FlagIcon = lazy(() => import("../phone-input/flag-icon"))
//#endregion

export type CountryOption = { label: string; value: Country }

interface SelectCountryPopoverProps<T extends Country>
	extends Partial<Pick<React.ComponentPropsWithoutRef<typeof Button>, "className" | "size">> {
	label?: string
	onChange: (newCountry: T) => void
	options?: CountryOption[]
	value: T
	withCountryCode?: boolean
	withPlaceholder?: boolean
}

const SelectCountryPopover = ({
	className,
	label,
	onChange,
	options = isoCountryOptions,
	size = "default",
	value,
	withCountryCode = false,
	withPlaceholder = true,
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
			{!!label?.length && <Label size={size as "default" | "lg"}>{label}</Label>}

			<Popover onOpenChange={setOpen} open={open}>
				<Popover.Trigger asChild>
					<Button className='w-full px-2' hasValue={!!value?.length} size={size} variant='outline-grey'>
						<Suspense fallback={<Skeleton className='h-5 w-5' />}>
							<FlagIcon label={options.find((c) => c?.value === value)?.label ?? value} value={value} />
						</Suspense>
						{withPlaceholder && (
							<span className='flex-1 truncate px-2 text-start text-gray-500'>
								{value?.length ? options.find((c) => c?.value === value)?.label : t("selectCountryPopover.placeholder")}
							</span>
						)}
						<LucideChevronDown className='h-4 w-4' />
					</Button>
				</Popover.Trigger>

				<Popover.Content align='start' className='border border-gray-300 p-0'>
					<Command>
						<Command.Input placeholder={t("comboBox.placeholder")} />
						<Command.List>
							{loading ? (
								<Command.Loading>
									<div className='flex h-full min-h-[250px] w-full flex-1 flex-col gap-1.5 p-2'>
										{Array.from({ length: 7 }, (_, i) => (
											<Skeleton className='h-7 w-full' key={i} />
										))}
									</div>
								</Command.Loading>
							) : (
								<>
									<Command.Empty className='min-h-[250px] w-full flex-center'>{t("noResultsComponent")}</Command.Empty>
									<Command.Group>
										{options
											.filter(({ label }) => label.toLocaleLowerCase() !== "international")
											.map((option, idx) => (
												<Command.Item
													className={twMerge(
														"flex gap-2 transition-basic",
														option.value === value && "pointer-events-none bg-primary-50"
													)}
													key={`${value}-${idx}`}
													onSelect={() => onChange(option.value)}>
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
