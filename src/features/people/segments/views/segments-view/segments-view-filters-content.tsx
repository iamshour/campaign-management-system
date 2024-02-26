//#region Import
import type { DataGridState } from "@/core/slices/data-grid-slice/types"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import { DateRangePicker } from "@/ui"
import { memo } from "react"
//#endregion

const SegmentsViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const filters = useSelector<DataGridState<"segments">["filters"]>(({ dataGrid }) => dataGrid["segments"]?.filters)

	return (
		<DateRangePicker
			dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
			updateDateRange={(segments) => dispatch(updateFilters({ segments }))}
		/>
	)
})

SegmentsViewFiltersContent.displayName = "SegmentsViewFiltersContent"

export default SegmentsViewFiltersContent
