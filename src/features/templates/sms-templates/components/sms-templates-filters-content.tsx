//#region Import
import { useAdvancedTableContext } from "@/core/components/advanced-table"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import SelectLanguagesPopover from "@/features/templates/sms-templates/components/select-languages-popover"
import SelectStatusesPopover from "@/features/templates/sms-templates/components/select-statuses-popover"
import SelectTypesPopover from "@/features/templates/sms-templates/components/select-types-popover"
import type {
	SmsTemplateLanguageOption,
	SmsTemplateStatusOption,
	SmsTemplateTypeOption,
	SmsTemplatesTableFiltersType,
} from "@/features/templates/sms-templates/types"
import { DateRangePicker } from "@/ui"
import { getListOfKey } from "@/utils"
//#endregion

const SmsTemplatesFiltersContent = () => {
	const dispatch = useDispatch()

	const { tableKey } = useAdvancedTableContext()

	// Statically Inferring Filters Type because tableKey could be either "sms-templates" or "templates-in-industries",
	// but type of Passed Data Type is different (first is SmsTemplateType and second is SmsPrebuiltTemplateType)
	const filters = useSelector(({ advancedTable }) => advancedTable[tableKey]?.filters) as SmsTemplatesTableFiltersType

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

export default SmsTemplatesFiltersContent
