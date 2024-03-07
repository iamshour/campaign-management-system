//#region Import
import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
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

	const { dataViewKey } = useDataViewContext()

	const filters = useSelector<ContactTableFiltersType>(
		(state) => selectFilters(state, dataViewKey) as ContactTableFiltersType
	)

	const updateState = useCallback(
		(newFilters?: Partial<ContactTableFiltersType>) => dispatch(updateFilters({ [dataViewKey]: newFilters })),
		[dataViewKey, dispatch]
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
