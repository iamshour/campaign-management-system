//#region Import
import type { PopperContentProps } from "@radix-ui/react-popover"
import { Suspense, lazy } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import { formatISO, dateFnsAdd, objHasFalseyValues, type Locale } from "@/utils"

import Button, { type ButtonProps } from "../button"
import Label from "../label"
import Popover from "../popover"
import CalendarSkeleton from "../skeletons/calendar-skeleton"

import DateRangePlaceholder from "./date-range-placeholder"

import RadixIconsCalendar from "~icons/radix-icons/calendar"

const Calendar = lazy(() => import("../calendar"))
//#endregion

export type DateRange = Partial<Record<"startDate" | "endDate", string>>

export interface DateRangePicker {
	dateRange?: DateRange
	updateDateRange: (dateRange?: DateRange) => void
	locale?: Locale
	className?: string
	label?: string
	placeholder?: string
	triggerProps?: ButtonProps
	popoverContentProps?: PopperContentProps
	calendarProps?: Omit<React.ComponentPropsWithoutRef<typeof Calendar>, "onSelect" | "selected" | "mode">
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
	dateRange,
	updateDateRange,
	locale,
	className,
	label,
	placeholder,
	calendarProps,
	triggerProps,
	popoverContentProps,
}: DateRangePicker) => {
	const { t } = useTranslation("ui", { keyPrefix: "dateRange" })

	return (
		<div className={twMerge("relative w-[340px] max-w-full")}>
			<div className='flex w-full items-end justify-between'>
				<Label size='default'>{label || t("label")}</Label>

				<Button
					className='h-max px-1.5 py-0 pb-0.5 text-primary-600 hover:bg-transparent hover:text-primary-900'
					variant='ghost'
					size='sm'
					onClick={() => updateDateRange(undefined)}>
					{t("actions.clear")}
				</Button>
			</div>

			<div className={twMerge("grid gap-2", className)}>
				<Popover>
					<Popover.Trigger asChild>
						<Button
							id='date'
							variant='outline-secondary'
							hasValue={!objHasFalseyValues(dateRange)}
							{...triggerProps}
							className={twMerge("w-full justify-start text-start font-normal", triggerProps?.className)}>
							<RadixIconsCalendar className='me-2 h-4 w-4' />
							<DateRangePlaceholder {...dateRange} placeholder={placeholder || t("placeholder")} />
						</Button>
					</Popover.Trigger>
					<Popover.Content
						align='start'
						side='bottom'
						{...popoverContentProps}
						className={twMerge("w-auto p-0", popoverContentProps?.className)}>
						<Suspense fallback={<CalendarSkeleton />}>
							<Calendar
								initialFocus
								mode='range'
								// defaultMonth={dateRange?.from}
								selected={{
									from: dateRange?.startDate ? new Date(dateRange?.startDate) : undefined,
									to: dateRange?.endDate ? new Date(dateRange?.endDate) : undefined,
								}}
								onSelect={(dateRange) =>
									updateDateRange({
										startDate: dateRange?.from ? formatISO(dateRange?.from) : undefined,
										// endDate time in changed from 00:00 to 23:59 using dateFnsAdd, so that this day is included in range
										endDate: dateRange?.to
											? formatISO(dateFnsAdd(dateRange?.to, { hours: 23, minutes: 59 }))
											: undefined,
									})
								}
								numberOfMonths={2}
								locale={locale}
								toDate={new Date()}
								{...calendarProps}
							/>
						</Suspense>
					</Popover.Content>
				</Popover>
			</div>
		</div>
	)
}

export default DateRangePicker
