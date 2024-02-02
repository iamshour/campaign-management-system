//#region Import
import { DateRangePicker } from "@blueai/ui"
import { getListOfKey } from "@blueai/utils"

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
				// eslint-disable-next-line
				// @ts-ignore
				dateRange={filters?.dateRange}
				// eslint-disable-next-line
				// @ts-ignore
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

export default FiltersContent
