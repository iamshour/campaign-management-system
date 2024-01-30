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
			dateRange={filters?.dateRange}
			updateDateRange={(dateRange) => dispatch(updateFilters({ ["groups"]: { dateRange } }))}
		/>
	)
}

export default FiltersContent
