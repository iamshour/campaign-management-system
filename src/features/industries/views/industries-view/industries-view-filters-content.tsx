//#region Import
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import { DateRangePicker } from "@/ui"
//#endregion

const IndustriesViewFiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector<AdvancedTableStateType<"industries">>(
		({ advancedTable }) => advancedTable["industries"]
	)

	return (
		<DateRangePicker
			dateRange={filters?.dateRange}
			updateDateRange={(dateRange) => dispatch(updateFilters({ industries: { dateRange } }))}
		/>
	)
}

export default IndustriesViewFiltersContent
