//#region Import
import type { SmsListingPendingRequestFilter } from "@/features/channels/sms-senders-management/types"
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

const SmsListingRequestsPendingViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const { dataViewKey } = useDataViewContext()

	const filters = useSelector<SmsListingPendingRequestFilter>(
		(state) => selectFilters(state, dataViewKey) as SmsListingPendingRequestFilter
	)

	const updateState = useCallback(
		(newFilters?: Partial<SmsListingPendingRequestFilter>) => dispatch(updateFilters({ [dataViewKey]: newFilters })),
		[dataViewKey, dispatch]
	)

	return (
		<>
			<DateRangePicker
				dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
				updateDateRange={updateState}
			/>

			<SelectMultiTemplateTypesPopover
				onValueChange={(selection) => updateState({ type: getListOfKey(selection, "value") as TemplateType[] })}
				value={filters?.type}
			/>

			{/* TODO: MAKE IT MULTI SELECT  */}
			<SelectCountryPopover
				label='Target Country'
				onChange={(v) => updateState({ targetCountry: [v] })}
				value={filters?.targetCountry ? filters?.targetCountry[0] : undefined}
			/>
		</>
	)
})

SmsListingRequestsPendingViewFiltersContent.displayName = "SmsListingRequestsPendingViewFiltersContent"

export default SmsListingRequestsPendingViewFiltersContent
