//#region Import
import { useDataGridContext } from "@/core/components/data-grid"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import SelectTagsPopover from "@/features/people/contacts/components/select-tags-popover"
import SelectGroupsPopover from "@/features/people/groups/components/select-groups-popover"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
//#endregion

/**
 * Filter fields (content) used in All Pages that fetches Contacts ("./contacts", "./groups/:id/add-contacts")
 */
const ContactsFiltersContent = () => {
	const dispatch = useDispatch()

	const { dataGridKey } = useDataGridContext()

	const { filters } = useSelector<DataGridState<"contacts" | "add-contacts-to-group">>(
		({ dataGrid }) => dataGrid[dataGridKey as "contacts" | "add-contacts-to-group"]
	)

	return (
		<>
			<DateRangePicker
				dateRange={filters?.dateRange}
				updateDateRange={(dateRange) => dispatch(updateFilters({ [dataGridKey]: { dateRange } }))}
			/>
			<SelectTagsPopover
				isMulti
				selection={filters?.tags?.map((value) => ({ label: value, value })) || []}
				updateSelection={(tags) => dispatch(updateFilters({ [dataGridKey]: { tags: getListOfKey(tags, "value") } }))}
			/>
			<SelectGroupsPopover
				isMulti
				selection={filters?.groups || []}
				updateSelection={(groups) => dispatch(updateFilters({ [dataGridKey]: { groups } }))}
			/>
		</>
	)
}

export default ContactsFiltersContent
