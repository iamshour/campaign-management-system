//#region Import
import type { PopperContentProps } from "@radix-ui/react-popover"
import { formatISO, type Locale, endOfDay } from "date-fns"
import { Suspense, lazy, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import { objHasFalseyValues } from "@/utils"

import Button from "../button/button"
import Label from "../label/label"
import Popover from "../popover/popover"
import Skeleton from "../skeleton/skeleton"

import DateRangePlaceholder from "./date-range-placeholder"

import RadixIconsCalendar from "~icons/radix-icons/calendar"
const Calendar = lazy(() => import("../calendar/calendar"))
//#endregion

export type DateRange = Partial<Record<"startDate" | "endDate", string>>

export interface DateRangePicker {
	dateRange?: DateRange
	updateDateRange: (dateRange?: DateRange) => void
	locale?: Locale
	className?: string
	label?: string
	placeholder?: string
	triggerProps?: React.ComponentPropsWithoutRef<typeof Button>
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
	const [range, setRange] = useState(dateRange)

	const { t } = useTranslation("ui", { keyPrefix: "dateRange" })

	useEffect(() => {
		if (!objHasFalseyValues(range)) updateDateRange(range)

		if ((!range?.startDate && !!range?.endDate) || (!range?.endDate && !!range?.startDate)) {
			updateDateRange(undefined)
		}

		// eslint-disable-next-line
	}, [range])

	const onClearRange = () => {
		setRange(undefined)
		updateDateRange(undefined)
	}

	return (
		<div className={twMerge("relative w-[340px] max-w-full")}>
			<div className='flex w-full items-end justify-between'>
				<Label size='default'>{label || t("label")}</Label>

				<Button
					className='h-max px-1.5 py-0 pb-0.5 text-primary-600 hover:bg-transparent hover:text-primary-900'
					variant='ghost'
					size='sm'
					onClick={onClearRange}>
					{t("actions.clear")}
				</Button>
			</div>

			<div className={twMerge("grid gap-2", className)}>
				<Popover>
					<Popover.Trigger asChild>
						<Button
							id='date'
							variant='outline-grey'
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
								selected={{
									from: range?.startDate ? new Date(range?.startDate) : undefined,
									to: range?.endDate ? new Date(range?.endDate) : undefined,
								}}
								onSelect={(updatedRange) => {
									if (updatedRange === undefined) onClearRange()

									setRange({
										startDate: updatedRange?.from ? formatISO(updatedRange?.from) : undefined,
										endDate: updatedRange?.to ? formatISO(endOfDay(updatedRange?.to)) : undefined,
									})
								}}
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

const CalendarSkeleton = () => (
	<div className='grid h-[350px] w-[544px] grid-cols-2 gap-4 p-4'>
		<div className='w-/1/2 flex h-full flex-col gap-4'>
			<Skeleton className='h-[56px] w-full' />
			<Skeleton className='h-full w-full flex-1' />
		</div>
		<div className='w-/1/2 flex h-full flex-col gap-4'>
			<Skeleton className='h-[56px] w-full' />
			<Skeleton className='h-full w-full flex-1' />
		</div>
	</div>
)
