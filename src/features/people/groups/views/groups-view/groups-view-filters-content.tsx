//#region Import
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import { DateRangePicker } from "@/ui"
//#endregion

const GroupsViewFiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector<DataGridState<"groups">>(({ dataGrid }) => dataGrid["groups"])

	return (
		<DateRangePicker
			dateRange={filters?.dateRange}
			updateDateRange={(dateRange) => dispatch(updateFilters({ groups: { dateRange } }))}
		/>
	)
}

export default GroupsViewFiltersContent
