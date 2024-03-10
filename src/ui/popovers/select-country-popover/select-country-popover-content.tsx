//#region Import
import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { type Country, getCountryCallingCode } from "react-phone-number-input"
import { twMerge } from "tailwind-merge"

import Command from "../../command/command"
import Skeleton from "../../skeleton/skeleton"

const FlagIcon = lazy(() => import("../../phone-input/flag-icon"))
//#endregion

export type CountryOption = { label: string; value: Country }

export interface SelectCountryPopoverContentProps<T extends CountryOption> {
	/**
	 * Callback function used to close popover
	 */
	closePopover: () => void

	/**
	 * Callback function used to update Country
	 * @param newCountry
	 */
	onChange: (newCountry: T["value"]) => void

	/**
	 * List of Countries to be displayed
	 */
	options?: T[]

	/**
	 * Currently selected country
	 */
	value?: T["value"]

	/**
	 * Bool check for whehter the each entry will have a country code displayed along name
	 */
	withCountryCode?: boolean
}

const SelectCountryPopoverContent = <T extends CountryOption>({
	closePopover,
	onChange,
	options,
	value,
	withCountryCode,
}: SelectCountryPopoverContentProps<T>) => {
	const { t } = useTranslation("ui")

	return (
		<Command>
			<Command.Input placeholder={t("selectAsyncOptionsPopover.placeholder")} />
			<Command.List>
				<Command.Empty className='min-h-[250px] w-full flex-center'>{t("noResultsComponent")}</Command.Empty>
				<Command.Group>
					{options
						?.filter(({ label }) => label.toLocaleLowerCase() !== "international")
						.map((option, idx) => (
							<Command.Item
								className={twMerge(
									"flex gap-2 transition-basic",
									option.value === value && "pointer-events-none bg-primary-50"
								)}
								key={`${value}-${idx}`}
								onSelect={() => {
									onChange(option.value)
									closePopover()
								}}>
								<Suspense fallback={<Skeleton className='h-5 w-5' />}>
									<FlagIcon {...option} />
								</Suspense>
								<span className='truncate font-medium'>{option.label}</span>
								{withCountryCode && <span className='truncate'>+ {getCountryCallingCode(option?.value)}</span>}
							</Command.Item>
						))}
				</Command.Group>
			</Command.List>
		</Command>
	)
}

export default SelectCountryPopoverContent
