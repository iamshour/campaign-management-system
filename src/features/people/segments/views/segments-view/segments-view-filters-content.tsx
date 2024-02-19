//#region Import
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import { DateRangePicker } from "@/ui"
//#endregion

const SegmentsViewFiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector<DataGridState<"segments">>(({ dataGrid }) => dataGrid["segments"])

	return (
		<>
			<DateRangePicker
				dateRange={filters?.dateRange}
				updateDateRange={(dateRange) => dispatch(updateFilters({ segments: { dateRange } }))}
			/>
		</>
	)
}

export default SegmentsViewFiltersContent
