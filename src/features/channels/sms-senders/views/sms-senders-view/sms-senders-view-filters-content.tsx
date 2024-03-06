//#region Import
import type { SmsSenderFilter } from "@/features/channels/sms-senders/types"
import type { TemplateType } from "@/features/templates/common/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import SelectMultiTemplateTypesPopover from "@/features/templates/common/components/select-multi-template-types-popover"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"
//#endregion

const SmsSendersViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const { dataViewKey } = useDataViewContext()

	const filters = useSelector<SmsSenderFilter | undefined>(
		(state) => selectFilters(state, dataViewKey) as SmsSenderFilter | undefined
	)

	const updateSelection = useCallback(
		(newFilters?: Partial<SmsSenderFilter>) => dispatch(updateFilters({ [dataViewKey]: newFilters })),
		[dispatch, dataViewKey]
	)

	return (
		<>
			<DateRangePicker
				dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
				label='Last updated date'
				updateDateRange={updateSelection}
			/>
			<SelectMultiTemplateTypesPopover
				onValueChange={(selection) => updateSelection({ types: getListOfKey(selection, "value") as TemplateType[] })}
				value={filters?.types}
			/>
		</>
	)
})

SmsSendersViewFiltersContent.displayName = "SmsSendersViewFiltersContent"

export default SmsSendersViewFiltersContent
