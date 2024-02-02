//#region Import
import { DateRangePicker } from "@blueai/ui"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/advanced-table-slice"

//#endregion

const FiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector(({ advancedTable }) => advancedTable["groups"])

	return (
		<DateRangePicker
			// eslint-disable-next-line
		// @ts-ignore
			dateRange={filters?.dateRange}
			// eslint-disable-next-line
			// @ts-ignore
			updateDateRange={(dateRange) => dispatch(updateFilters({ ["groups"]: { dateRange } }))}
		/>
	)
}

export default FiltersContent
