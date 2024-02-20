//#region Import
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import { DateRangePicker } from "@/ui"
//#endregion

const IndustriesViewFiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector<DataGridState<"industries">>(({ dataGrid }) => dataGrid["industries"])

	return (
		<DateRangePicker
			dateRange={{ startDate: filters?.startDate, endDate: filters?.endDate }}
			updateDateRange={(industries) => dispatch(updateFilters({ industries }))}
		/>
	)
}

export default IndustriesViewFiltersContent
