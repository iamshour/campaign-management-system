//#region Import
import type { ChannelSourceRequestFilter } from "@/features/channels/sms-senders-management/types/api.types"
import type { TemplateType } from "@/features/templates/common/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import SelectMultiTemplateTypesPopover from "@/features/templates/common/components/select-multi-template-types-popover"
import { DateRangePicker, SelectCountryPopover } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"
//#endregion

const ChannelSourceRequestsPendingViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const { dataViewKey } = useDataViewContext()

	const filters = useSelector<ChannelSourceRequestFilter>(
		(state) => selectFilters(state, dataViewKey) as ChannelSourceRequestFilter
	)

	const updateState = useCallback(
		(newFilters?: Partial<ChannelSourceRequestFilter>) => dispatch(updateFilters({ [dataViewKey]: newFilters })),
		[dataViewKey, dispatch]
	)

	return (
		<>
			<DateRangePicker
				dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
				updateDateRange={updateState}
			/>

			<SelectMultiTemplateTypesPopover
				onValueChange={(selection) =>
					updateState({ templateTypes: getListOfKey(selection, "value") as TemplateType[] })
				}
				value={filters?.templateTypes}
			/>

			<SelectCountryPopover
				isMulti
				label='Target Country'
				onChange={(countries) => updateState({ countries })}
				value={filters?.countries || []}
			/>
		</>
	)
})

ChannelSourceRequestsPendingViewFiltersContent.displayName = "ChannelSourceRequestsPendingViewFiltersContent"

export default ChannelSourceRequestsPendingViewFiltersContent
