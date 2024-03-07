//#region Import
import type { SmsOptedOutFilter } from "@/features/channels/sms-senders-management/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { SelectCountryPopover } from "@/ui"
import { memo, useCallback } from "react"
//#endregion

const SmsOptedOutSendersViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const { dataViewKey } = useDataViewContext()

	const filters = useSelector<SmsOptedOutFilter>((state) => selectFilters(state, dataViewKey) as SmsOptedOutFilter)

	const updateState = useCallback(
		(newFilters?: Partial<SmsOptedOutFilter>) => dispatch(updateFilters({ [dataViewKey]: newFilters })),
		[dataViewKey, dispatch]
	)

	return (
		//  TODO: MAKE IT MULTI SELECT
		<SelectCountryPopover
			label='Target Country'
			onChange={(v) => updateState({ country: [v] })}
			value={filters?.country ? filters?.country[0] : undefined}
		/>
	)
})

SmsOptedOutSendersViewFiltersContent.displayName = "SmsOptedOutSendersViewFiltersContent"

export default SmsOptedOutSendersViewFiltersContent
