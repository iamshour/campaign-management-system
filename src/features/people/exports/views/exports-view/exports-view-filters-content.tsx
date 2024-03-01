//#region Import
import type { ContactExportFilter, ContactExportStatusOption } from "@/features/people/exports/types"

import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import SelectExportedByPopover from "@/features/people/exports/components/select-exported-by-popover/select-exported-by-popover"
import SelectMultiExportsStatusesPopover from "@/features/people/exports/components/select-multi-exports-statuses-popover"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"
//#endregion

const ExportsViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const filters = useSelector<ContactExportFilter | undefined>(
		(state) => selectFilters(state, "contacts-exports") as ContactExportFilter | undefined
	)

	const onValueChange = useCallback(
		(newFilters?: Partial<ContactExportFilter>) => {
			dispatch(updateFilters({ "contacts-exports": newFilters }))
		},
		[dispatch]
	)

	return (
		<>
			<DateRangePicker
				dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
				updateDateRange={onValueChange}
			/>
			<SelectMultiExportsStatusesPopover
				onValueChange={(statuses) =>
					onValueChange({ statuses: getListOfKey(statuses, "value") as ContactExportStatusOption[] })
				}
				value={filters?.statuses?.map((value) => ({ label: value, value })) || []}
			/>
			<SelectExportedByPopover
				isMulti
				selection={filters?.exportedBy?.map((value) => ({ label: value, value })) || []}
				updateSelection={(selection) => onValueChange({ exportedBy: getListOfKey(selection, "value") })}
			/>
		</>
	)
})

ExportsViewFiltersContent.displayName = "ExportsViewFiltersContent"

export default ExportsViewFiltersContent
