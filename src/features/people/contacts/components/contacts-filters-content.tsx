//#region Import
import { useDataGridContext } from "@/core/components/data-grid/data-grid"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import SelectTagsPopover from "@/features/people/contacts/components/select-tags-popover/select-tags-popover"
import SelectGroupsPopover from "@/features/people/groups/components/select-groups-popover/select-groups-popover"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"

import type { ContactTableFiltersType } from "../types"
//#endregion

/**
 * Filter fields (content) used in All Pages that fetches Contacts ("./contacts", "./groups/:id/add-contacts")
 */
const ContactsFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const { dataGridKey } = useDataGridContext()

	const filters = useSelector<ContactTableFiltersType | undefined>(
		({ dataGrid }) => dataGrid[dataGridKey as "add-contacts-to-group" | "contacts"]?.filters
	)

	const updateState = useCallback(
		(newFilters?: Partial<ContactTableFiltersType>) => dispatch(updateFilters({ [dataGridKey]: newFilters })),
		[dataGridKey, dispatch]
	)

	return (
		<>
			<DateRangePicker
				dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
				updateDateRange={updateState}
			/>
			<SelectTagsPopover
				isMulti
				selection={filters?.tags?.map((value) => ({ label: value, value })) || []}
				updateSelection={(tags) => updateState({ tags: getListOfKey(tags, "value") })}
			/>
			<SelectGroupsPopover
				isMulti
				selection={filters?.groups || []}
				updateSelection={(groups) => updateState({ groups })}
			/>
		</>
	)
})

ContactsFiltersContent.displayName = "ContactsFiltersContent"

export default ContactsFiltersContent
