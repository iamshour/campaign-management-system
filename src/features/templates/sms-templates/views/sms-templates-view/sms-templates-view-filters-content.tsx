//#region Import
import type { TemplateLanguage, TemplateStatus, TemplateType } from "@/features/templates/common/types"
import type { TemplateFilter } from "@/features/templates/sms-templates/types"

import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import SelectMultiLanguagesPopover from "@/features/templates/common/components/select-multi-languages-popover"
import SelectMultiTemplateStatusesPopover from "@/features/templates/common/components/select-multi-template-statuses-popover"
import SelectMultiTemplateTypesPopover from "@/features/templates/common/components/select-multi-template-types-popover"
import templateLanguagesLocaleMap from "@/features/templates/common/constants/template-languages-local-map"
import templateStatusesLocaleMap from "@/features/templates/common/constants/template-statuses-local-map"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"
//#endregion

const SmsTemplatesFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const filters = useSelector<TemplateFilter | undefined>(
		(state) => selectFilters(state, "sms-templates") as TemplateFilter | undefined
	)

	const onValueChange = useCallback(
		(newFilters?: Partial<TemplateFilter>) => {
			dispatch(updateFilters({ "sms-templates": newFilters }))
		},
		[dispatch]
	)

	return (
		<>
			<DateRangePicker
				dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
				label='Last updated date'
				updateDateRange={onValueChange}
			/>
			<SelectMultiTemplateStatusesPopover
				onValueChange={(selection) => onValueChange({ statuses: getListOfKey(selection, "value") as TemplateStatus[] })}
				value={filters?.statuses?.map((value) => ({ label: templateStatusesLocaleMap[value], value })) || []}
			/>
			<SelectMultiTemplateTypesPopover
				onValueChange={(selection) => onValueChange({ types: getListOfKey(selection, "value") as TemplateType[] })}
				value={filters?.types}
			/>

			<SelectMultiLanguagesPopover
				onValueChange={(selection) =>
					onValueChange({ languages: getListOfKey(selection, "value") as TemplateLanguage[] })
				}
				value={filters?.languages?.map((value) => ({ label: templateLanguagesLocaleMap[value], value })) || []}
			/>
		</>
	)
})

SmsTemplatesFiltersContent.displayName = "SmsTemplatesFiltersContent"

export default SmsTemplatesFiltersContent
