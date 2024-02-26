//#region Import
import type { DataGridFilterType, DataGridState } from "@/core/slices/data-grid-slice/types"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import SelectTagsPopover from "@/features/people/contacts/components/select-tags-popover/select-tags-popover"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"
//#endregion

/**
 * Filter fields (content) used in Contacts in Group page
 */
const GroupViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const filters = useSelector<DataGridState<"contacts-in-group">["filters"]>(
		({ dataGrid }) => dataGrid["contacts-in-group"]?.filters
	)

	const updateSelection = useCallback(
		(newFilters?: Partial<Partial<DataGridFilterType["contacts-in-group"]>>) => {
			dispatch(updateFilters({ "contacts-in-group": newFilters }))
		},
		[dispatch]
	)

	return (
		<>
			<DateRangePicker
				dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
				updateDateRange={updateSelection}
			/>
			<SelectTagsPopover
				isMulti
				selection={filters?.tags?.map((value) => ({ label: value, value })) || []}
				updateSelection={(tags) => updateSelection({ tags: getListOfKey(tags, "value") })}
			/>
		</>
	)
})

GroupViewFiltersContent.displayName = "GroupViewFiltersContent"

export default GroupViewFiltersContent
