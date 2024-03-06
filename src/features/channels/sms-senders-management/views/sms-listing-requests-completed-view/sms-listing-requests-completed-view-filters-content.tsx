//#region Import
import type { SmsListingCompletedRequestFilter } from "@/features/channels/sms-senders-management/types"
import type { TemplateType } from "@/features/templates/common/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { RequestActionType } from "@/features/channels/common/types"
import SelectMultiTemplateTypesPopover from "@/features/templates/common/components/select-multi-template-types-popover"
import { DateRangePicker, SelectCountryPopover } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"

import SelectMultiListingRequestActionsPopover from "../../components/select-multi-listing-request-actions-popover"
//#endregion

const SmsListingRequestsCompletedViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const { dataViewKey } = useDataViewContext()

	const filters = useSelector<SmsListingCompletedRequestFilter>(
		(state) => selectFilters(state, dataViewKey) as SmsListingCompletedRequestFilter
	)

	const updateState = useCallback(
		(newFilters?: Partial<SmsListingCompletedRequestFilter>) => dispatch(updateFilters({ [dataViewKey]: newFilters })),
		[dataViewKey, dispatch]
	)

	return (
		<>
			<DateRangePicker
				dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
				updateDateRange={updateState}
			/>

			<SelectMultiListingRequestActionsPopover
				onValueChange={(selection) => updateState({ action: getListOfKey(selection, "value") as RequestActionType[] })}
				value={filters?.action}
			/>

			<SelectMultiTemplateTypesPopover
				onValueChange={(selection) => updateState({ type: getListOfKey(selection, "value") as TemplateType[] })}
				value={filters?.type}
			/>

			{/* TODO: MAKE IT MULTI SELECT  */}
			<SelectCountryPopover
				label='Target Country'
				onChange={(v) => updateState({ country: [v] })}
				value={filters?.country ? filters?.country[0] : undefined}
			/>
		</>
	)
})

SmsListingRequestsCompletedViewFiltersContent.displayName = "SmsListingRequestsCompletedViewFiltersContent"

export default SmsListingRequestsCompletedViewFiltersContent
