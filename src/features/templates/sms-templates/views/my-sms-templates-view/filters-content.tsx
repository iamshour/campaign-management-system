//#region Import

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { AdvancedTableStateValue, updateFilters } from "@/core/slices/advanced-table-slice"
import { DateRangePicker } from "@/ui"

import SelectLanguagesPopover from "../../components/select-languages-popover"
import SelectStatusesPopover from "../../components/select-statuses-popover"
import SelectTypesPopover from "../../components/select-types-popover"
import type {
	SmsTemplate,
	SmsTemplateLanguageOption,
	SmsTemplateStatusOption,
	SmsTemplateTypeOption,
} from "../../types"

//#endregion

const FiltersContent = () => {
	const dispatch = useDispatch()

	const { filters } = useSelector<AdvancedTableStateValue<SmsTemplate>>(
		({ advancedTable }) => advancedTable["sms-templates"]
	)

	return (
		<>
			<DateRangePicker
				label='Last updated date'
				dateRange={filters?.dateRange}
				updateDateRange={(dateRange) => dispatch(updateFilters({ ["sms-templates"]: { dateRange } }))}
			/>
			<SelectStatusesPopover
				isMulti
				selection={filters?.templateStatus?.map((value) => ({ label: value, value })) || []}
				updateSelection={(selection) =>
					dispatch(
						updateFilters({
							["sms-templates"]: { templateStatus: selection?.map(({ value }) => value) as SmsTemplateStatusOption[] },
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
							["sms-templates"]: { templateType: selection?.map(({ value }) => value) as SmsTemplateTypeOption[] },
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
							["sms-templates"]: {
								templateLanguage: selection?.map(({ value }) => value) as SmsTemplateLanguageOption[],
							},
						})
					)
				}
			/>
		</>
	)
}

export default FiltersContent
