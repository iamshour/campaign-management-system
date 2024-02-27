//#region Import
import type {
	SmsTemplateLanguageOption,
	SmsTemplateStatusOption,
	SmsTemplateTypeOption,
	TemplateFilter,
} from "@/features/templates/sms-templates/types"

import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import SelectLanguagesPopover from "@/features/templates/sms-templates/components/select-languages-popover"
import SelectTemplateStatusesPopover from "@/features/templates/sms-templates/components/select-template-statuses-popover"
import SelectTemplateTypesPopover from "@/features/templates/sms-templates/components/select-template-types-popover"
import smsTemplateLanguagesLocaleMap from "@/features/templates/sms-templates/constants/sms-template-languages-local-map"
import smsTemplateStatusesLocaleMap from "@/features/templates/sms-templates/constants/sms-template-statuses-local-map"
import smsTemplateTypesLocaleMap from "@/features/templates/sms-templates/constants/sms-template-types-local-map"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
import { memo, useCallback } from "react"
//#endregion

const SmsTemplatesFiltersContent = memo(() => {
	const dispatch = useDispatch()

	const filters = useSelector<TemplateFilter | undefined>(
		(state) => selectFilters(state, "sms-templates") as TemplateFilter | undefined
	)

	const updateSelection = useCallback(
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
				updateDateRange={updateSelection}
			/>
			<SelectTemplateStatusesPopover
				isMulti
				selection={filters?.statuses?.map((value) => ({ label: smsTemplateStatusesLocaleMap[value], value })) || []}
				updateSelection={(selection) =>
					updateSelection({ statuses: getListOfKey(selection, "value") as SmsTemplateStatusOption[] })
				}
			/>
			<SelectTemplateTypesPopover
				isMulti
				selection={filters?.types?.map((value) => ({ label: smsTemplateTypesLocaleMap[value], value })) || []}
				updateSelection={(selection) =>
					updateSelection({ types: getListOfKey(selection, "value") as SmsTemplateTypeOption[] })
				}
			/>
			<SelectLanguagesPopover
				isMulti
				selection={filters?.languages?.map((value) => ({ label: smsTemplateLanguagesLocaleMap[value], value })) || []}
				updateSelection={(selection) =>
					updateSelection({ languages: getListOfKey(selection, "value") as SmsTemplateLanguageOption[] })
				}
			/>
		</>
	)
})

SmsTemplatesFiltersContent.displayName = "SmsTemplatesFiltersContent"

export default SmsTemplatesFiltersContent
