//#region Import
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
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

const SmsTemplatesViewFiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector<AdvancedTableStateType<"sms-templates">>(
		({ advancedTable }) => advancedTable["sms-templates"]
	)

	return (
		<>
			<DateRangePicker
				label='Last updated date'
				dateRange={filters?.dateRange}
				updateDateRange={(dateRange) => dispatch(updateFilters({ "sms-templates": { dateRange } }))}
			/>
			<SelectStatusesPopover
				isMulti
				selection={filters?.templateStatus?.map((value) => ({ label: value, value })) || []}
				updateSelection={(selection) =>
					dispatch(
						updateFilters({
							"sms-templates": { templateStatus: getListOfKey(selection, "value") as SmsTemplateStatusOption[] },
						})
					)
				}
			/>
			<SelectTypesPopover
				isMulti
				selection={filters?.templateType?.map((value) => ({ label: value, value })) || []}
				updateSelection={(selection) =>
					dispatch(
						updateFilters({
							"sms-templates": { templateType: getListOfKey(selection, "value") as SmsTemplateTypeOption[] },
						})
					)
				}
			/>
			<SelectLanguagesPopover
				isMulti
				selection={filters?.templateLanguage?.map((value) => ({ label: value, value })) || []}
				updateSelection={(selection) =>
					dispatch(
						updateFilters({
							"sms-templates": {
								templateLanguage: getListOfKey(selection, "value") as SmsTemplateLanguageOption[],
							},
						})
					)
				}
			/>
		</>
	)
}

export default SmsTemplatesViewFiltersContent