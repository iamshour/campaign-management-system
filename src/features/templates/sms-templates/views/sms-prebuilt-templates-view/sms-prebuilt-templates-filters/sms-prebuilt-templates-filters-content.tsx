//#region Import
import { useCallback } from "react"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import type { IndustryType, PrebuiltTemplateFilter } from "@/features/industries/types"
import smsTemplateLanguagesOptions from "@/features/templates/sms-templates/constants/sms-template-languages-options"
import smsTemplateTypesOptions from "@/features/templates/sms-templates/constants/sms-template-types-options"
import type { SmsTemplateLanguageOption, SmsTemplateTypeOption } from "@/features/templates/sms-templates/types"
import { SearchInput, Separator, Button, Label, Checkbox, Collapsible } from "@/ui"
//#endregion

interface SmsPrebuiltTemplatesFiltersContentProps {
	list: IndustryType[]

	onIndustrySearch: (searchTerm?: string) => void
}

const SmsPrebuiltTemplatesFiltersContent = ({ list, onIndustrySearch }: SmsPrebuiltTemplatesFiltersContentProps) => {
	const dispatch = useDispatch()

	// Getting Default User's Industry from User info in authSlice (Token))
	const defaultUserIndustryId = useSelector(({ auth }) => auth?.user?.industryId)

	const { filters } = useSelector<DataGridState<"sms-prebuilt-templates">>(
		({ dataGrid }) => dataGrid["sms-prebuilt-templates"]
	)

	const onFilterClick = useCallback(
		(updatedFilters: Partial<PrebuiltTemplateFilter>) => {
			dispatch(updateFilters({ "sms-prebuilt-templates": updatedFilters }))
		},
		[dispatch]
	)

	const onTemplateTypeCheck = useCallback(
		(value: SmsTemplateTypeOption) => {
			const prevTemplateTypes = filters?.types || []
			const updatedTemplateTypes = prevTemplateTypes?.includes(value)
				? prevTemplateTypes?.filter((v) => v !== value)
				: [...prevTemplateTypes, value]

			onFilterClick({ types: updatedTemplateTypes })
		},
		[filters?.types, onFilterClick]
	)

	const onTemplateLanguageCheck = useCallback(
		(value: SmsTemplateLanguageOption) => {
			const prevTemplateLanguage = filters?.languages || []
			const updatedTemplateLanguages = prevTemplateLanguage?.includes(value)
				? prevTemplateLanguage?.filter((v) => v !== value)
				: [...prevTemplateLanguage, value]

			onFilterClick({ languages: updatedTemplateLanguages })
		},
		[filters?.languages, onFilterClick]
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

			<div className='h-[calc(100%-168px)] space-y-1 overflow-y-auto'>
				<CollapsibleSection label='Industries'>
					<SearchInput className='overflow-visible' variant='underlined' onChange={onIndustrySearch} />

					<div className='flex h-[250px] w-full flex-col gap-1 overflow-y-auto'>
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
				</CollapsibleSection>
				<CollapsibleSection label='Type'>
					{smsTemplateTypesOptions?.map(({ label, value }) => (
						<div key={value} className='flex flex-row items-center space-x-3 space-y-0 ps-3'>
							<Checkbox
								id={value}
								checked={filters?.types?.includes(value)}
								onCheckedChange={() => onTemplateTypeCheck(value)}
							/>
							<Label className='cursor-pointer p-0 transition-basic hover:text-primary-900' htmlFor={value}>
								{label}
							</Label>
						</div>
					))}
				</CollapsibleSection>
				<CollapsibleSection label='Language'>
					{smsTemplateLanguagesOptions?.map(({ label, value }) => (
						<div key={value} className='flex flex-row items-center space-x-3 space-y-0 ps-3'>
							<Checkbox
								id={value}
								checked={filters?.languages?.includes(value)}
								onCheckedChange={() => onTemplateLanguageCheck(value)}
							/>
							<Label className='cursor-pointer p-0 transition-basic hover:text-primary-900' htmlFor={value}>
								{label}
							</Label>
						</div>
					))}
				</CollapsibleSection>
			</div>
		</div>
	)
}

export default SmsPrebuiltTemplatesFiltersContent

const sortButtonsLabels: { filterBy?: PrebuiltTemplateFilter["filterBy"]; label: string }[] = [
	{ label: "All Templates" },
	{ filterBy: "RECENT", label: "Recently Added" },
	{ filterBy: "POPULAR", label: "Most Popular" },
]

const CollapsibleSection = ({ label, children }: { label: string; children: React.ReactNode }) => (
	<Collapsible className='w-full overflow-hidden rounded-lg px-4 text-start transition-basic data-[state=open]:bg-primary-50/10'>
		<Collapsible.Trigger showArrow className='rounded-md p-3 transition-basic hover:bg-primary-50/20'>
			<span className='flex-1 whitespace-nowrap text-start transition-[opacity] duration-300 ease-in-out'>{label}</span>
		</Collapsible.Trigger>
		<Collapsible.Content>
			<div className='flex h-full w-full flex-col gap-4 overflow-hidden py-2'>{children}</div>
		</Collapsible.Content>
	</Collapsible>
)
