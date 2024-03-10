//#region Import
import type { SmsListingsFilter } from "@/features/channels/common/types"
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

const AdminSmsListingsViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const { dataViewKey } = useDataViewContext()

	const filters = useSelector<SmsListingsFilter>((state) => selectFilters(state, dataViewKey) as SmsListingsFilter)

	const updateState = useCallback(
		(newFilters?: Partial<SmsListingsFilter>) => dispatch(updateFilters({ [dataViewKey]: newFilters })),
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
					updateState({ status: getListOfKey(selection, "value") as ChannelSourceListingStatus[] })
				}
				value={filters?.status}
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

AdminSmsListingsViewFiltersContent.displayName = "AdminSmsListingsViewFiltersContent"

export default AdminSmsListingsViewFiltersContent
