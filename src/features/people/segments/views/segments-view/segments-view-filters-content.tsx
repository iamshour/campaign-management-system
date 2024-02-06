//#region Import

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import { DateRangePicker } from "@/ui"
//#endregion

const SegmentsViewFiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector<AdvancedTableStateType<"segments">>(({ advancedTable }) => advancedTable["segments"])

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
