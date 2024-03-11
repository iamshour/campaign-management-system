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
				onValueChange={(selection) => {
					let channelSourceListingStatus: ChannelSourceListingStatus | undefined

					if (!selection) channelSourceListingStatus = undefined

					if (selection?.length === 1) channelSourceListingStatus = selection[0]?.value as ChannelSourceListingStatus

					if (selection?.length > 1) channelSourceListingStatus = selection[1]?.value as ChannelSourceListingStatus

					updateState({ channelSourceListingStatus })
				}}
				value={filters?.channelSourceListingStatus ? [filters?.channelSourceListingStatus] : undefined}
			/>
			<SelectMultiTemplateTypesPopover
				onValueChange={(selection) => {
					let templateType: TemplateType | undefined

					if (!selection) templateType = undefined

					if (selection?.length === 1) templateType = selection[0]?.value as TemplateType

					if (selection?.length > 1) templateType = selection[1]?.value as TemplateType

					updateState({ templateType })
				}}
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
