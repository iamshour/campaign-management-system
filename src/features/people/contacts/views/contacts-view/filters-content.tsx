//#region Import
import { DateRangePicker } from "@blueai/ui"

import { useAdvancedTableContext } from "@/core/components/advanced-table"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/advanced-table-slice"
import SelectTagsPopover from "@/features/people/contacts/components/select-tags-popover"
import SelectGroupsPopover from "@/features/people/groups/components/select-groups-popover"
//#endregion

/**
 * Filter fields (content) used in All Pages that fetches Contacts ("./contacts", "./groups/:id", "./groups/:id/add-contacts")
 */
const FiltersContent = () => {
	const dispatch = useDispatch()

	const { tableKey } = useAdvancedTableContext()

	const { filters } = useSelector(({ advancedTable }) => advancedTable[tableKey])

	return (
		<>
			<DateRangePicker
				dateRange={filters?.dateRange}
				updateDateRange={(dateRange) => dispatch(updateFilters({ [tableKey]: { dateRange } }))}
			/>
			<SelectTagsPopover
				selectedOptions={filters?.tags || []}
				updateSelectedOptions={(tags) => dispatch(updateFilters({ [tableKey]: { tags } }))}
			/>
			<SelectGroupsPopover
				isMulti
				selectedOptions={filters?.groups || []}
				updateSelectedOptions={(groups) => dispatch(updateFilters({ [tableKey]: { groups } }))}
			/>
		</>
	)
}

export default FiltersContent
