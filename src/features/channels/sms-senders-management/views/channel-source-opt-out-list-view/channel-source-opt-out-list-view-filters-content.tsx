//#region Import
import type { ChannelSourceOptOutFilter } from "@/features/channels/sms-senders-management/types/api.types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { SelectCountryPopover } from "@/ui"
import { memo, useCallback } from "react"
//#endregion

const ChannelSourceOptOutListViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const { dataViewKey } = useDataViewContext()

	const filters = useSelector<ChannelSourceOptOutFilter>(
		(state) => selectFilters(state, dataViewKey) as ChannelSourceOptOutFilter
	)

	const updateState = useCallback(
		(newFilters?: Partial<ChannelSourceOptOutFilter>) => dispatch(updateFilters({ [dataViewKey]: newFilters })),
		[dataViewKey, dispatch]
	)

	return (
		<SelectCountryPopover
			isMulti
			label='Target Country'
			onChange={(countries) => updateState({ countries })}
			value={filters?.countries || []}
		/>
	)
})

ChannelSourceOptOutListViewFiltersContent.displayName = "ChannelSourceOptOutListViewFiltersContent"

export default ChannelSourceOptOutListViewFiltersContent
