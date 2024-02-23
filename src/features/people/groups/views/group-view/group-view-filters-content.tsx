//#region Import
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import SelectTagsPopover from "@/features/people/contacts/components/select-tags-popover"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
//#endregion

/**
 * Filter fields (content) used in Contacts in Group page
 */
const GroupViewFiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector<DataGridState<"contacts-in-group">>(({ dataGrid }) => dataGrid["contacts-in-group"])

	return (
		<>
			<DateRangePicker
				dateRange={filters?.dateRange}
				updateDateRange={(dateRange) => dispatch(updateFilters({ "contacts-in-group": { dateRange } }))}
			/>
			<SelectTagsPopover
				isMulti
				selection={filters?.tags?.map((value) => ({ label: value, value })) || []}
				updateSelection={(tags) =>
					dispatch(updateFilters({ "contacts-in-group": { tags: getListOfKey(tags, "value") } }))
				}
			/>
		</>
	)
}

export default GroupViewFiltersContent
