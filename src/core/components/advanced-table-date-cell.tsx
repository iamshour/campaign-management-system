import { format } from "date-fns"

interface AdvancedTableDateCellProps {
	// Stringified date, recieved from server
	date?: string

	// Date formatting
	dateFormat?: "MM-dd-yyyy" | "MM-dd-yyyy | hh:mm aaa"
}

/**
 * Shared Reusable Component that handles rendering Dates inside Advanced Tables
 * @param props.date Stringified date passed from the server
 * @param props.dateFormat Format of the date to be rendered
 */
const AdvancedTableDateCell = ({ date, dateFormat = "MM-dd-yyyy" }: AdvancedTableDateCellProps) => {
	if (!date) return

	const jsDateObject = new Date(date)

	if (!jsDateObject || isNaN(jsDateObject as any)) return <>INVALID DATE</>

	return <>{format(jsDateObject, dateFormat)}</>
}

export default AdvancedTableDateCell