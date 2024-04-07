//#region Import
import type { ChannelSourceFilter } from "@/features/channels/common/types/api.types"
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

const ChannelSourcesViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const { dataViewKey } = useDataViewContext()

	const filters = useSelector<ChannelSourceFilter | undefined>(
		(state) => selectFilters(state, dataViewKey) as ChannelSourceFilter | undefined
	)

	const updateSelection = useCallback(
		(newFilters?: Partial<ChannelSourceFilter>) => dispatch(updateFilters({ [dataViewKey]: newFilters })),
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
				onValueChange={(selection) =>
					updateSelection({ templateTypes: getListOfKey(selection, "value") as TemplateType[] })
				}
				value={filters?.templateTypes}
			/>
		</>
	)
})

ChannelSourcesViewFiltersContent.displayName = "ChannelSourcesViewFiltersContent"

export default ChannelSourcesViewFiltersContent
