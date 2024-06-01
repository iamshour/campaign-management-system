//#region Import
import type { DataViewFilterType } from "@/core/components/data-view/types"

import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import SelectTagsPopover from "@/features/people/contacts/components/select-tags-popover/select-tags-popover"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
//#endregion

/**
 * Filter fields (content) used in Contacts in Group page
 */
const GroupViewFiltersContent = memo(() => {
	const { t } = useTranslation()

	const dispatch = useDispatch()

	const filters = useSelector<DataViewFilterType["contacts-in-group"]>(
		(state) => selectFilters(state, "contacts-in-group") as DataViewFilterType["contacts-in-group"]
	)

	const updateSelection = useCallback(
		(newFilters?: Partial<Partial<DataViewFilterType["contacts-in-group"]>>) => {
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
				label={t("contacts:components.tagsPopover.label")}
				selection={filters?.tags?.map((value) => ({ label: value, value })) || []}
				updateSelection={(tags) => updateSelection({ tags: getListOfKey(tags, "value") })}
			/>
		</>
	)
})

GroupViewFiltersContent.displayName = "GroupViewFiltersContent"

export default GroupViewFiltersContent
