//#region Import
import type { ContactGroupFilter } from "@/features/people/groups/types"

import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { DateRangePicker } from "@/ui"
import { memo } from "react"
//#endregion

const GroupsViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const filters = useSelector<ContactGroupFilter>((state) => selectFilters(state, "groups") as ContactGroupFilter)

	return (
		<DateRangePicker
			dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
			updateDateRange={(groups) => dispatch(updateFilters({ groups }))}
		/>
	)
})

GroupsViewFiltersContent.displayName = "GroupsViewFiltersContent"

export default GroupsViewFiltersContent
