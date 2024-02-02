//#region Import

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/advanced-table-slice"
import { DateRangePicker } from "@/ui"
//#endregion

const FiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector(({ advancedTable }) => advancedTable["segments"])

	return (
		<>
			<DateRangePicker
				// eslint-disable-next-line
				// @ts-ignore
				dateRange={filters?.dateRange}
				// eslint-disable-next-line
				// @ts-ignore
				updateDateRange={(dateRange) => dispatch(updateFilters({ segments: { dateRange } }))}
			/>
		</>
	)
}

export default FiltersContent
