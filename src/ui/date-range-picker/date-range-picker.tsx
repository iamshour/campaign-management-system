//#region Import
import type { PopperContentProps } from "@radix-ui/react-popover"

import { objHasFalseyValues } from "@/utils"
import RadixIconsCalendar from "~icons/radix-icons/calendar"
import { endOfDay, formatISO, type Locale } from "date-fns"
import { lazy, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import Button from "../button/button"
import Label from "../label/label"
import Popover from "../popover/popover"
import DateRangePlaceholder from "./date-range-placeholder"

const Calendar = lazy(() => import("../calendar/calendar"))
//#endregion

export type DateRange = Partial<Record<"endDate" | "startDate", string>>

export interface DateRangePicker {
	calendarProps?: Omit<React.ComponentPropsWithoutRef<typeof Calendar>, "mode" | "onSelect" | "selected">
	className?: string
	dateRange?: DateRange
	label?: string
	locale?: Locale
	placeholder?: string
	popoverContentProps?: PopperContentProps
	triggerProps?: React.ComponentPropsWithoutRef<typeof Button>
	updateDateRange: (dateRange?: DateRange) => void
}

/**
 * DateRangePicker Component
 * @component
 *
 * @example
 * // Example 1: Basic usage
 *				<DateRangePicker
 *					dateRange={{ from: subYears(new Date, 1), to: new Date() }}
 *					onDateRangeChange={(dateRange) => updateDate(dateRange)}
 *				/>
 * @param props - DateRangePicker component props
 * @param props.dateRange - DateRange Object, containing both from and to keys, as Date or Undefined for each
 * @param props.onDateRangeChange - Setter function to update, passes DateRange as param
 * @param props.locale - locale used, mainly 'en' or 'ar'
 * @param props.className - WRapper Component's classname
 */
const DateRangePicker = ({
	calendarProps,
	className,
	dateRange,
	label,
	locale,
	placeholder,
	triggerProps,
	updateDateRange,
}: DateRangePicker) => {
	const [range, setRange] = useState(dateRange)

	const { t } = useTranslation("ui", { keyPrefix: "dateRange" })

	useEffect(() => {
		if (!objHasFalseyValues(range)) updateDateRange(range)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [range])

	const onClearRange = () => {
		setRange(undefined)
		updateDateRange({ endDate: undefined, startDate: undefined })
	}

	return (
		<div className={twMerge("relative w-[340px] max-w-full")}>
			<div className='flex w-full items-end justify-between'>
				<Label size='default'>{label || t("label")}</Label>

				<Button
					className='h-max px-1.5 py-0 pb-0.5 text-primary-600 hover:bg-transparent hover:text-primary-900'
					disabled={objHasFalseyValues(range)}
					onClick={onClearRange}
					size='sm'
					variant='ghost'>
					{t("actions.clear")}
				</Button>
			</div>

			<div className={twMerge("grid gap-2", className)}>
				<Popover>
					<Popover.Trigger asChild>
						<Button
							hasValue={!objHasFalseyValues(dateRange)}
							id='date'
							variant='outline-grey'
							{...triggerProps}
							className={twMerge("w-full justify-start text-start font-normal", triggerProps?.className)}>
							<RadixIconsCalendar className='me-2 h-4 w-4' />
							<DateRangePlaceholder {...dateRange} placeholder={placeholder || t("placeholder")} />
						</Button>
					</Popover.Trigger>
					<Popover.Content align='start' className='w-auto p-0' side='bottom' skeletonClassName='h-[350px] w-[544px]'>
						<Calendar
							initialFocus
							locale={locale}
							mode='range'
							numberOfMonths={2}
							onSelect={(updatedRange) => {
								onClearRange()

								setRange({
									endDate: updatedRange?.to ? formatISO(endOfDay(updatedRange?.to)) : undefined,
									startDate: updatedRange?.from ? formatISO(updatedRange?.from) : undefined,
								})
							}}
							selected={{
								from: range?.startDate ? new Date(range?.startDate) : undefined,
								to: range?.endDate ? new Date(range?.endDate) : undefined,
							}}
							toDate={new Date()}
							{...calendarProps}
						/>
					</Popover.Content>
				</Popover>
			</div>
		</div>
	)
}

export default DateRangePicker
