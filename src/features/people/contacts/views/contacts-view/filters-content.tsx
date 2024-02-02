//#region Import
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"

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
				// eslint-disable-next-line
				// @ts-ignore
				dateRange={filters?.dateRange}
				updateDateRange={(dateRange) => dispatch(updateFilters({ [tableKey]: { dateRange } }))}
			/>
			<SelectTagsPopover
				isMulti
				selection={filters?.tags?.map((value) => ({ label: value, value })) || []}
				updateSelection={(tags) => dispatch(updateFilters({ [tableKey]: { tags: getListOfKey(tags, "value") } }))}
			/>
			<SelectGroupsPopover
				isMulti
				selection={filters?.groups || []}
				updateSelection={(groups) => dispatch(updateFilters({ [tableKey]: { groups } }))}
			/>
		</>
	)
}

export default FiltersContent
