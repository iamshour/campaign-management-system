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
						channelSourceListingStatus: (selection?.length ? selection[0] : undefined) as
							| ChannelSourceListingStatus
							| undefined,
					})
				}
				value={filters?.channelSourceListingStatus ? [filters?.channelSourceListingStatus] : undefined}
			/>
			<SelectMultiTemplateTypesPopover
				onValueChange={(selection) =>
					updateState({ templateType: (selection?.length ? selection[0] : undefined) as TemplateType | undefined })
				}
				value={filters?.templateType ? [filters?.templateType] : undefined}
			/>
			<SelectCountryPopover
				label='Target Country'
				onChange={(country) => updateState({ country })}
				value={filters?.country}
			/>
		</>
	)
})

AdminListingsViewFiltersContent.displayName = "AdminListingsViewFiltersContent"

export default AdminListingsViewFiltersContent
