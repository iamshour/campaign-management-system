//#region Import

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import SelectExportedByPopover from "@/features/people/exports/components/select-exported-by-popover"
import SelectStatusesPopover from "@/features/people/exports/components/select-statuses-popover"
import type { ContactExportStatusOption } from "@/features/people/exports/types"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
//#endregion

const ExportsViewFiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector<AdvancedTableStateType<"contacts-exports">>(
		({ advancedTable }) => advancedTable["contacts-exports"]
	)

	return (
		<>
			<DateRangePicker
				dateRange={filters?.dateRange}
				updateDateRange={(dateRange) => dispatch(updateFilters({ ["contacts-exports"]: { dateRange } }))}
			/>
			<SelectStatusesPopover
				isMulti
				selection={filters?.status?.map((value) => ({ label: value, value })) || []}
				updateSelection={(statuses) =>
					dispatch(
						updateFilters({
							"contacts-exports": { status: getListOfKey(statuses, "value") as ContactExportStatusOption[] },
						})
					)
				}
			/>
			<SelectExportedByPopover
				isMulti
				selection={filters?.exportedBy?.map((value) => ({ label: value, value })) || []}
				updateSelection={(selection) =>
					dispatch(updateFilters({ "contacts-exports": { exportedBy: getListOfKey(selection, "value") } }))
				}
			/>
		</>
	)
}

export default ExportsViewFiltersContent
