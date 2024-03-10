//#region Import
import type { ChannelSourceRequestFilter } from "@/features/channels/sms-senders-management/types/api.types"
import type { TemplateType } from "@/features/templates/common/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { ChannelSourceRequestAction } from "@/features/channels/common/types/data.types"
import SelectMultiTemplateTypesPopover from "@/features/templates/common/components/select-multi-template-types-popover"
import { DateRangePicker, SelectCountryPopover } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"

import SelectMultiListingRequestActionsPopover from "../../components/select-multi-listing-request-actions-popover"
//#endregion

const ChannelSourceRequestsCompletedViewFiltersContent = memo(() => {
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

			<SelectMultiListingRequestActionsPopover
				onValueChange={(selection) =>
					updateState({ actions: getListOfKey(selection, "value") as ChannelSourceRequestAction[] })
				}
				value={filters?.actions}
			/>

			<SelectMultiTemplateTypesPopover
				onValueChange={(selection) =>
					updateState({ templateTypes: getListOfKey(selection, "value") as TemplateType[] })
				}
				value={filters?.templateTypes}
			/>

			{/* TODO: MAKE IT MULTI SELECT  */}
			<SelectCountryPopover
				label='Target Country'
				onChange={(v) => updateState({ countries: [v] })}
				value={filters?.countries?.length ? filters?.countries[0] : undefined}
			/>
		</>
	)
})

ChannelSourceRequestsCompletedViewFiltersContent.displayName = "ChannelSourceRequestsCompletedViewFiltersContent"

export default ChannelSourceRequestsCompletedViewFiltersContent
