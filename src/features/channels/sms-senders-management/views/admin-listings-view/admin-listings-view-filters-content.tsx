//#region Import
import type { ChannelSourceListingFilter } from "@/features/channels/common/types/api.types"
import type { ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"
import type { TemplateType } from "@/features/templates/common/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import SelectMultiListingStatusesPopover from "@/features/channels/sms-senders-management/components/select-multi-listing-statuses-popover"
import SelectMultiTemplateTypesPopover from "@/features/templates/common/components/select-multi-template-types-popover"
import { DateRangePicker, SelectCountryPopover } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"
//#endregion

const AdminListingsViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const { dataViewKey } = useDataViewContext()

	const filters = useSelector<ChannelSourceListingFilter>(
		(state) => selectFilters(state, dataViewKey) as ChannelSourceListingFilter
	)

	const updateState = useCallback(
		(newFilters?: Partial<ChannelSourceListingFilter>) => dispatch(updateFilters({ [dataViewKey]: newFilters })),
		[dataViewKey, dispatch]
	)

	return (
		<>
			<DateRangePicker
				dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
				updateDateRange={updateState}
			/>
			<SelectMultiListingStatusesPopover
				onValueChange={(selection) =>
					updateState({
						channelSourceListingStatuses: getListOfKey(selection, "value") as ChannelSourceListingStatus[],
					})
				}
				value={filters?.channelSourceListingStatuses}
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

AdminListingsViewFiltersContent.displayName = "AdminListingsViewFiltersContent"

export default AdminListingsViewFiltersContent
