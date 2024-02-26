//#region Import
import type { IndustryFilter } from "@/features/industries/types"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import { DateRangePicker } from "@/ui"
import { memo } from "react"
//#endregion

const IndustriesViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const filters = useSelector<IndustryFilter | undefined>(({ dataGrid }) => dataGrid["industries"]?.filters)

	return (
		<DateRangePicker
			dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
			updateDateRange={(industries) => dispatch(updateFilters({ industries }))}
		/>
	)
})

IndustriesViewFiltersContent.displayName = "IndustriesViewFiltersContent"

export default IndustriesViewFiltersContent
