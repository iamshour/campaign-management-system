//#region Import
import type { ContactGroupFilter } from "@/features/people/groups/types"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import { DateRangePicker } from "@/ui"
import { memo } from "react"
//#endregion

const GroupsViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const filters = useSelector<ContactGroupFilter | undefined>(({ dataGrid }) => dataGrid["groups"]?.filters)

	return (
		<DateRangePicker
			dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
			updateDateRange={(groups) => dispatch(updateFilters({ groups }))}
		/>
	)
})

GroupsViewFiltersContent.displayName = "GroupsViewFiltersContent"

export default GroupsViewFiltersContent
