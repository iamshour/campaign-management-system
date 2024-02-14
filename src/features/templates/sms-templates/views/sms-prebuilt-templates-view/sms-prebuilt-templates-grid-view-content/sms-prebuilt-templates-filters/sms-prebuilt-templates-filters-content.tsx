//#region Import
import { useCallback } from "react"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import { IndustryType } from "@/features/industries/types"
import smsTemplateLanguagesOptions from "@/features/templates/sms-templates/constants/sms-template-languages-options"
import smsTemplateTypesOptions from "@/features/templates/sms-templates/constants/sms-template-types-options"
import type {
	SmsPrebuiltTemplatesTableFiltersType,
	SmsTemplateLanguageOption,
	SmsTemplateTypeOption,
} from "@/features/templates/sms-templates/types"
import { SearchInput, Separator, Button, Label, Checkbox, Collapsible, type CheckedState } from "@/ui"
//#endregion

interface SmsPrebuiltTemplatesFiltersContentProps {
	list: IndustryType[]

	onIndustrySearch: (searchTerm?: string) => void
}

type OnCheckPayloadType =
	| { key: "templateType"; value: SmsTemplateTypeOption }
	| { key: "templateLanguage"; value: SmsTemplateLanguageOption }

const SmsPrebuiltTemplatesFiltersContent = ({ list, onIndustrySearch }: SmsPrebuiltTemplatesFiltersContentProps) => {
	const dispatch = useDispatch()

	// Getting Default User's Industry from User info in authSlice (Token))
	const defaultUserIndustryId = useSelector(({ auth }) => auth?.user?.industryId)

	const { filters } = useSelector<AdvancedTableStateType<"sms-prebuilt-templates">>(
		({ advancedTable }) => advancedTable["sms-prebuilt-templates"]
	)

	/**
	 * Callback Function passed for both `templateType` & `templateLanguage` filters (checkboxes)
	 * @param checked Boolean check for whether the checkbox is checked or not
	 * @param param1.key Key referreing to where the checkbox is clicked:  `templateType` or `templateLanguage`
	 * @param param1.value Value of filter, to be sent to the server
	 *	("PROMOTIONAL" | "TRANSACTIONAL" | "OTP" in case key is templateType) or ("ENGLISH" | "UNICODE" in case key is templateLanguage)
	 */
	const onFilterCheckboxClick = useCallback(
		(checked: CheckedState, { key, value }: OnCheckPayloadType) => {
			let updatedFilter: (typeof value)[] = []

			if (!filters?.[key]) {
				updatedFilter = [value]
			} else if (checked) {
				updatedFilter = filters?.[key] ? [...filters[key]!, value] : [value]
			} else {
				updatedFilter = filters?.[key]?.filter((item) => item !== value) || []
			}

			dispatch(updateFilters({ "sms-prebuilt-templates": { [key]: updatedFilter } }))
		},
		[dispatch, filters]
	)

	const onFilterClick = useCallback(
		(updatedFilters: Partial<SmsPrebuiltTemplatesTableFiltersType>) => {
			dispatch(updateFilters({ "sms-prebuilt-templates": updatedFilters }))
		},
		[dispatch]
	)

	return (
		<div className='z-10 flex h-full w-[300px] flex-col overflow-hidden bg-[#edf3f7]'>
			<div className='w-full space-y-2 p-4'>
				{sortButtonsLabels?.map(({ label, filterBy }, idx) => (
					<Button
						key={label}
						variant='ghost'
						active={(!filters?.filterBy && idx === 0) || filterBy === filters?.filterBy}
						className='w-full justify-start font-normal transition-all will-change-[font-weight,background-color] data-[active=true]:bg-primary-600 data-[active=true]:font-semibold data-[active=true]:text-white'
						onClick={() => onFilterClick({ filterBy })}>
						{label}
					</Button>
				))}
			</div>

			<Separator />

			<div className='h-[calc(100%-168px)] overflow-y-auto border-b'>
				<CollapsibleButton label='Industries'>
					<SearchInput className='overflow-visible' variant='underlined' onChange={onIndustrySearch} />

					<div className='flex max-h-[300px] w-full flex-col gap-1 overflow-y-auto'>
						{list?.map(({ id: industryId, name }) => (
							<Button
								key={industryId}
								variant='ghost'
								active={filters?.industryId ? industryId === filters?.industryId : industryId === defaultUserIndustryId}
								className='h-max w-full max-w-[80%] shrink-0 justify-start whitespace-break-spaces p-2 text-start font-normal text-[#054060] data-[active=true]:bg-[#C8E0EE] data-[active=true]:text-[#054060] hover:bg-[#C8E0EE]'
								onClick={() => onFilterClick({ industryId })}>
								{name}
							</Button>
						))}
					</div>
				</CollapsibleButton>
				<CollapsibleButton label='Type'>
					{smsTemplateTypesOptions?.map(({ label, value }) => (
						<div key={value} className='flex flex-row items-center space-x-3 space-y-0 ps-3'>
							<Checkbox
								id={value}
								checked={filters?.templateType?.includes(value)}
								onCheckedChange={(checked) => onFilterCheckboxClick(checked, { key: "templateType", value })}
							/>
							<Label className='cursor-pointer p-0 transition-basic hover:text-primary-900' htmlFor={value}>
								{label}
							</Label>
						</div>
					))}
				</CollapsibleButton>
				<CollapsibleButton label='Language'>
					{smsTemplateLanguagesOptions?.map(({ label, value }) => (
						<div key={value} className='flex flex-row items-center space-x-3 space-y-0 ps-3'>
							<Checkbox
								id={value}
								checked={filters?.templateLanguage?.includes(value)}
								onCheckedChange={(checked) => onFilterCheckboxClick(checked, { key: "templateLanguage", value })}
							/>
							<Label className='cursor-pointer p-0 transition-basic hover:text-primary-900' htmlFor={value}>
								{label}
							</Label>
						</div>
					))}
				</CollapsibleButton>
			</div>
		</div>
	)
}

export default SmsPrebuiltTemplatesFiltersContent

const sortButtonsLabels: { filterBy?: SmsPrebuiltTemplatesTableFiltersType["filterBy"]; label: string }[] = [
	{ label: "All Templates" },
	{ filterBy: "RECENT", label: "Recently Added" },
	{ filterBy: "POPULAR", label: "Most Popular" },
]

const CollapsibleButton = ({ label, children }: { label: string; children: React.ReactNode }) => (
	<Collapsible className='w-full overflow-hidden px-4 text-start'>
		<Collapsible.Trigger showArrow className='p-3'>
			<span className='flex-1 whitespace-nowrap text-start transition-[opacity] duration-300 ease-in-out'>{label}</span>
		</Collapsible.Trigger>
		<Collapsible.Content>
			<div className='flex h-full w-full flex-col gap-4 overflow-hidden py-2'>{children}</div>
		</Collapsible.Content>
	</Collapsible>
)
