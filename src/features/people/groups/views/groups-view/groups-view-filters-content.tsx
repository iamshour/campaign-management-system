//#region Import
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters, type AdvancedTableStateValue } from "@/core/slices/advanced-table-slice"
import type { Group } from "@/features/people/groups/types"
import { DateRangePicker } from "@/ui"
//#endregion

const GroupsViewFiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector<AdvancedTableStateValue<Group>>(({ advancedTable }) => advancedTable["groups"])

	return (
		<DateRangePicker
			dateRange={filters?.dateRange}
			updateDateRange={(dateRange) => dispatch(updateFilters({ groups: { dateRange } }))}
		/>
	)
}

export default GroupsViewFiltersContent
