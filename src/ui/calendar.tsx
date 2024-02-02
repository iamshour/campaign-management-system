//#region Import
import { DayPicker } from "react-day-picker"
import { twMerge } from "tailwind-merge"

import LucideChevronLeft from "~icons/lucide/chevron-left"
import LucideChevronRight from "~icons/lucide/chevron-right"
//#endregion

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const Calendar = ({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) => (
	<DayPicker
		showOutsideDays={showOutsideDays}
		className={twMerge("p-3", className)}
		classNames={{
			months: "flex flex-col sm:!flex-row space-y-4 sm:!space-x-4 sm:!space-y-0",
			month: "space-y-4",
			caption: "flex justify-center pt-1 relative items-center",
			caption_label: "text-sm font-medium",
			nav: "space-x-1 flex items-center",
			nav_button:
				"h-7 w-7 absolute p-0 bg-white text-primary-600 border border-current prevent-selection rounded-md flex-center text-sm transition-basic outline-0 ring-0 ring-offset-white ring-primary-900 focus-visible:ring-1 focus-visible:ring-primary-600 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 hover:bg-primary-50 hover:text-primary-800",
			nav_button_previous: "!left-1",
			nav_button_next: "!right-1",
			table: "w-full border-collapse space-y-1",
			head_row: "flex",
			head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
			row: "flex w-full mt-2",
			cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
			day: "rounded transition-basic h-9 w-9 p-0 font-normal ring-0 ring-primary-900 focus:!ring-1 hover:bg-slate-100 aria-selected:opacity-100",
			day_selected: "!bg-primary-800 text-white hover:!bg-primary-800",
			day_today: "bg-primary-200 text-slate-900",
			day_outside: "text-slate-500 !opacity-50",
			day_disabled: "text-slate-500 opacity-50",
			day_range_middle:
				"!text-slate-900 aria-selected:!bg-slate-100 aria-selected:!text-slate-900 hover:!text-slate-900",
			day_hidden: "invisible",
			...classNames,
		}}
		components={{
			IconLeft: () => <LucideChevronLeft className='h-4 w-4' />,
			IconRight: () => <LucideChevronRight className='h-4 w-4' />,
		}}
		{...props}
	/>
)

export default Calendar
