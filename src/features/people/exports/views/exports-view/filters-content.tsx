//#region Import
import { DateRangePicker } from "@blueai/ui"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/advanced-table-slice"
import SelectExportedByPopover from "@/features/people/exports/components/select-exported-by-popover"
import SelectStatusesPopover from "@/features/people/exports/components/select-statuses-popover"
import type { ContactExportStatusOption } from "@/features/people/exports/types"

//#endregion

const FiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector(({ advancedTable }) => advancedTable["contacts-exports"])

	return (
		<>
			<DateRangePicker
				dateRange={filters?.dateRange}
				updateDateRange={(dateRange) => dispatch(updateFilters({ ["contacts-exports"]: { dateRange } }))}
			/>
			<SelectStatusesPopover
				// isMulti
				selectedOptions={filters?.status || []}
				updateSelectedOptions={(selection) =>
					dispatch(updateFilters({ "contacts-exports": { status: selection as ContactExportStatusOption[] } }))
				}
			/>
			<SelectExportedByPopover
				// isMulti
				selectedOptions={filters?.exportedBy || []}
				updateSelectedOptions={(exportedBy) => dispatch(updateFilters({ "contacts-exports": { exportedBy } }))}
			/>
		</>
	)
}

export default FiltersContent
