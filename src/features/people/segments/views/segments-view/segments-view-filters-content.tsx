//#region Import
import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { DateRange, DateRangePicker } from "@/ui"
import { memo } from "react"
//#endregion

const SegmentsViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const filters = useSelector<DateRange | undefined>((state) => selectFilters(state, "segments"))

	return (
		<DateRangePicker
			dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
			updateDateRange={(segments) => dispatch(updateFilters({ segments }))}
		/>
	)
})

SegmentsViewFiltersContent.displayName = "SegmentsViewFiltersContent"

export default SegmentsViewFiltersContent
