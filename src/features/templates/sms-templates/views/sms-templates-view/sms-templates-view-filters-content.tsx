//#region Import
import { useCallback } from "react"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridState, FiltersFieldMappingType } from "@/core/slices/data-grid-slice/types"
import SelectLanguagesPopover from "@/features/templates/sms-templates/components/select-languages-popover"
import SelectStatusesPopover from "@/features/templates/sms-templates/components/select-statuses-popover"
import SelectTypesPopover from "@/features/templates/sms-templates/components/select-types-popover"
import type {
	SmsTemplateLanguageOption,
	SmsTemplateStatusOption,
	SmsTemplateTypeOption,
} from "@/features/templates/sms-templates/types"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
//#endregion

const SmsTemplatesFiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector<DataGridState<"sms-templates">>(({ dataGrid }) => dataGrid["sms-templates"])

	const updateSelection = useCallback(
		(newFilters: Partial<Partial<FiltersFieldMappingType["sms-templates"]>>) => {
			dispatch(updateFilters({ "sms-templates": newFilters }))
		},
		[dispatch]
	)

	return (
		<>
			<DateRangePicker
				label='Last updated date'
				dateRange={{ startDate: filters?.startDate, endDate: filters?.endDate }}
				updateDateRange={(dateRange) =>
					updateSelection({ startDate: dateRange?.startDate, endDate: dateRange?.endDate })
				}
			/>
			<SelectStatusesPopover
				isMulti
				selection={filters?.statuses?.map((value) => ({ label: value, value })) || []}
				updateSelection={(selection) =>
					updateSelection({ statuses: getListOfKey(selection, "value") as SmsTemplateStatusOption[] })
				}
			/>
			<SelectTypesPopover
				isMulti
				selection={filters?.types?.map((value) => ({ label: value, value })) || []}
				updateSelection={(selection) =>
					updateSelection({ types: getListOfKey(selection, "value") as SmsTemplateTypeOption[] })
				}
			/>
			<SelectLanguagesPopover
				isMulti
				selection={filters?.languages?.map((value) => ({ label: value, value })) || []}
				updateSelection={(selection) =>
					updateSelection({ languages: getListOfKey(selection, "value") as SmsTemplateLanguageOption[] })
				}
			/>
		</>
	)
}

export default SmsTemplatesFiltersContent
