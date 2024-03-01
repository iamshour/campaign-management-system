//#region Import
import type {
	SenderFilter,
	SmsSenderDataViewKeyOptions,
	SmsSenderTypeOption,
} from "@/features/channels/sms-senders/types"

import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import SelectMultiTemplateTypesPopover from "@/features/templates/common/components/select-multi-template-types-popover"
import templateTypesLocaleMap from "@/features/templates/common/constants/template-types-local-map"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"

//#endregion
interface SmsSendersFiltersContentProps {
	dataViewKey: SmsSenderDataViewKeyOptions
}
const SmsSendersFiltersContent = memo(({ dataViewKey }: SmsSendersFiltersContentProps) => {
	const dispatch = useDispatch()

	const filters = useSelector<SenderFilter | undefined>(
		(state) => selectFilters(state, dataViewKey) as SenderFilter | undefined
	)

	const updateSelection = useCallback(
		(newFilters?: Partial<SenderFilter>) => {
			dispatch(updateFilters({ [dataViewKey]: newFilters }))
		},
		[dispatch, dataViewKey]
	)

	return (
		<>
			<DateRangePicker
				dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
				label='Last updated date'
				updateDateRange={updateSelection}
			/>
			<SelectMultiTemplateTypesPopover
				onValueChange={(selection) =>
					updateSelection({ types: getListOfKey(selection, "value") as SmsSenderTypeOption[] })
				}
				value={filters?.types?.map((value) => ({ label: templateTypesLocaleMap[value], value })) || []}
			/>
		</>
	)
})

SmsSendersFiltersContent.displayName = "SmsSendersFiltersContent"

export default SmsSendersFiltersContent
