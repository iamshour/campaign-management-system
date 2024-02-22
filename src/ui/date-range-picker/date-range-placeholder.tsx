//#region Import
import { format } from "date-fns"

import type { DateRange } from "./date-range-picker"
//#endregion

interface DateRangePlaceholderProps extends Partial<DateRange> {
	placeholder: string
}

const DateRangePlaceholder = ({ placeholder, startDate, endDate }: DateRangePlaceholderProps) => (
	<>
		{startDate ? (
			endDate ? (
				<>
					{format(new Date(startDate), "LLL dd, y")} - {format(new Date(endDate), "LLL dd, y")}
				</>
			) : (
				format(new Date(startDate), "LLL dd, y")
			)
		) : (
			<span>{placeholder}</span>
		)}
	</>
)

export default DateRangePlaceholder
