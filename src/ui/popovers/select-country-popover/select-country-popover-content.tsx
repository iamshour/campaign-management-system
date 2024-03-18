//#region Import
import LucideCheck from "~icons/lucide/check"
import { lazy, Suspense, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { type Country, getCountryCallingCode } from "react-phone-number-input"
import { twMerge } from "tailwind-merge"

import Command from "../../command/command"
import Skeleton from "../../skeleton/skeleton"
const FlagIcon = lazy(() => import("../../phone-input/flag-icon"))
//#endregion

type SingleSelectCountryPopoverProps = {
	isMulti?: false
	onChange: (newCountry?: Country) => void
	value?: Country
}
type MultiSelectCountryPopoverProps = {
	isMulti: true
	onChange: (newCountry: Country[]) => void
	value: Country[]
}

export type SelectCountryPopoverContentProps = {
	options?: { label: string; value: Country }[]
	withCountryCode?: boolean
} & (MultiSelectCountryPopoverProps | SingleSelectCountryPopoverProps)

const SelectCountryPopoverContent = ({
	closePopover,
	isMulti,
	onChange,
	options,
	value,
	withCountryCode,
}: SelectCountryPopoverContentProps & { closePopover: () => void }) => {
	const { t } = useTranslation("ui")

	const isSelected = useCallback(
		(entry: string) => {
			if (isMulti) return value?.some((obj) => obj === entry)

			return value === entry
		},
		[isMulti, value]
	)

	const handleOnSelect = (newValue: Country) => {
		return () => {
			if (isMulti)
				return onChange(!value?.includes(newValue) ? [...value, newValue] : value?.filter((v) => v !== newValue))

			onChange(newValue)
			closePopover()
		}
	}

	return (
		<Command className='!h-full'>
			<Command.Input placeholder={t("selectAsyncOptionsPopover.placeholder")} />
			<Command.List className='flex-1 [&>div]:flex [&>div]:!h-full [&>div]:flex-col'>
				<Command.Empty className='min-h-[250px] w-full flex-center'>{t("noResultsComponent")}</Command.Empty>
				<Command.Group className='h-full flex-1 overflow-y-auto'>
					{options
						?.filter(({ label }) => label.toLocaleLowerCase() !== "international")
						.map((option, idx) => (
							<Command.Item
								className={twMerge(
									"flex gap-2 font-normal transition-basic",
									isSelected(option?.value) && "font-bold !text-primary-900"
								)}
								key={`${value}-${idx}`}
								onSelect={handleOnSelect(option.value)}>
								{isMulti && (
									<div
										className={twMerge(
											"me-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary transition-all duration-100",
											isSelected(option?.value) ? "bg-primary text-white" : "opacity-50 [&_svg]:invisible"
										)}>
										<LucideCheck className='h-4 w-4' />
									</div>
								)}

								<Suspense fallback={<Skeleton className='h-5 w-5' />}>
									<FlagIcon {...option} />
								</Suspense>
								<span className='truncate'>{option.label}</span>
								{withCountryCode && <span className='truncate'>+ {getCountryCallingCode(option?.value)}</span>}
							</Command.Item>
						))}
				</Command.Group>
			</Command.List>

			{!!isMulti && !!value?.length && (
				<Command.Group className='border-t'>
					<Command.Item
						className='cursor-pointer justify-center text-center hover:text-primary-900'
						onSelect={() => onChange([])}>
						{t("selectAsyncOptionsPopover.clearButton")}
					</Command.Item>
				</Command.Group>
			)}
		</Command>
	)
}

export default SelectCountryPopoverContent
