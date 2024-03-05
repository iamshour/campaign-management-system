//#region Import
import type { PrebuiltTemplateFilter } from "@/features/industries/types"
import type { TemplateLanguage, TemplateStatus, TemplateType } from "@/features/templates/common/types"

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

const SmsIndustryTemplatesViewFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const filters = useSelector<PrebuiltTemplateFilter | undefined>(
		(state) => selectFilters(state, "sms-industry-templates") as PrebuiltTemplateFilter | undefined
	)

	const updateSelection = useCallback(
		(newFilters?: Partial<PrebuiltTemplateFilter>) => {
			dispatch(updateFilters({ "sms-industry-templates": newFilters }))
		},
		[dispatch]
	)

	return (
		<>
			<DateRangePicker
				dateRange={{ endDate: filters?.endDate, startDate: filters?.startDate }}
				label='Last updated date'
				updateDateRange={updateSelection}
			/>
			<SelectMultiTemplateStatusesPopover
				onValueChange={(selection) =>
					updateSelection({ statuses: getListOfKey(selection, "value") as TemplateStatus[] })
				}
				value={filters?.statuses?.map((value) => ({ label: templateStatusesLocaleMap[value], value })) || []}
			/>
			<SelectMultiTemplateTypesPopover
				onValueChange={(selection) => updateSelection({ types: getListOfKey(selection, "value") as TemplateType[] })}
				value={filters?.types}
			/>
			<SelectMultiLanguagesPopover
				onValueChange={(selection) =>
					updateSelection({ languages: getListOfKey(selection, "value") as TemplateLanguage[] })
				}
				value={filters?.languages?.map((value) => ({ label: templateLanguagesLocaleMap[value], value })) || []}
			/>
		</>
	)
})

SmsIndustryTemplatesViewFiltersContent.displayName = "SmsIndustryTemplatesViewFiltersContent"

export default SmsIndustryTemplatesViewFiltersContent
