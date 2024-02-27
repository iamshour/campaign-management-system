//#region Import
import type { ContactExportFilter, ContactExportStatusOption } from "@/features/people/exports/types"

import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import SelectExportedByPopover from "@/features/people/exports/components/select-exported-by-popover/select-exported-by-popover"
import SelectExportsStatusesPopover from "@/features/people/exports/components/select-exports-statuses-popover/select-exports-statuses-popover"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"
//#endregion

const ExportsViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const filters = useSelector<ContactExportFilter | undefined>(
		(state) => selectFilters(state, "contacts-exports") as ContactExportFilter | undefined
	)

	const updateSelection = useCallback(
		(newFilters?: Partial<ContactExportFilter>) => {
			dispatch(updateFilters({ "contacts-exports": newFilters }))
		},
		[dispatch]
	)

	return (
		<>
			<DateRangePicker
				dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
				updateDateRange={updateSelection}
			/>
			<SelectExportsStatusesPopover
				isMulti
				selection={filters?.statuses?.map((value) => ({ label: value, value })) || []}
				updateSelection={(statuses) =>
					updateSelection({ statuses: getListOfKey(statuses, "value") as ContactExportStatusOption[] })
				}
			/>
			<SelectExportedByPopover
				isMulti
				selection={filters?.exportedBy?.map((value) => ({ label: value, value })) || []}
				updateSelection={(selection) => updateSelection({ exportedBy: getListOfKey(selection, "value") })}
			/>
		</>
	)
})

ExportsViewFiltersContent.displayName = "ExportsViewFiltersContent"

export default ExportsViewFiltersContent
