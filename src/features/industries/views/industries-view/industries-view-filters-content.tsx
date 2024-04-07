//#region Import
import type { IndustryFilter } from "@/features/industries/types"

import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { DateRangePicker } from "@/ui"
import { memo } from "react"
//#endregion

const IndustriesViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const filters = useSelector<IndustryFilter>((state) => selectFilters(state, "industries") as IndustryFilter)

	return (
		<DateRangePicker
			dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
			updateDateRange={(industries) => dispatch(updateFilters({ industries }))}
		/>
	)
})

IndustriesViewFiltersContent.displayName = "IndustriesViewFiltersContent"

export default IndustriesViewFiltersContent
