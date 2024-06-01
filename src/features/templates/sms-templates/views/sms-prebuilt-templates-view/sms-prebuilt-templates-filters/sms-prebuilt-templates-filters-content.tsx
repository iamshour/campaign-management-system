//#region Import
import type { IndustryType, PrebuiltTemplateFilter } from "@/features/industries/types"
import type { TemplateLanguage, TemplateType } from "@/features/templates/common/types"

import { selectFilters, updateFilters, updatePaginationAndSorting } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import templateLanguagesOptions from "@/features/templates/common/constants/template-languages-options"
import templateTypesOptions from "@/features/templates/common/constants/template-types-options"
import { Button, Checkbox, Collapsible, Label, NoResultsFound, SearchInput, Separator } from "@/ui"
import { memo, useCallback } from "react"
//#endregion

export interface SmsPrebuiltTemplatesFiltersContentProps {
	industrySearchTerm: string | undefined

	list: IndustryType[]

	onIndustrySearch: (searchTerm?: string) => void

	prebuiltTemplatesGridKey: "sms-prebuilt-templates-dialog" | "sms-prebuilt-templates"
}

const SmsPrebuiltTemplatesFiltersContent = memo(
	({
		industrySearchTerm,
		list,
		onIndustrySearch,
		prebuiltTemplatesGridKey,
	}: SmsPrebuiltTemplatesFiltersContentProps) => {
		const dispatch = useDispatch()

		// Getting Default User's Industry from User info in authSlice (Token))
		const defaultUserIndustryId = useSelector(({ auth }) => auth?.user?.industryId)

		const filters = useSelector<PrebuiltTemplateFilter | undefined>(
			(state) => selectFilters(state, prebuiltTemplatesGridKey) as PrebuiltTemplateFilter | undefined
		)

		const onFilterClick = useCallback(
			(updatedFilters: Partial<PrebuiltTemplateFilter>) => {
				// update filterBy
				dispatch(updateFilters({ [prebuiltTemplatesGridKey]: updatedFilters }))

				// reset pagination when user toggles filterBy
				if (updatedFilters?.filterBy) {
					dispatch(
						updatePaginationAndSorting({
							[prebuiltTemplatesGridKey]: { limit: 10, offset: 0 },
						})
					)
				}
			},
			[dispatch, prebuiltTemplatesGridKey]
		)

		const onTemplateTypeCheck = useCallback(
			(value: TemplateType) => {
				const prevTemplateTypes = filters?.types || []

				const updatedTemplateTypes = prevTemplateTypes?.includes(value)
					? prevTemplateTypes?.filter((v) => v !== value)
					: [...prevTemplateTypes, value]

				onFilterClick({ types: updatedTemplateTypes })
			},
			[filters?.types, onFilterClick]
		)

		const onTemplateLanguageCheck = useCallback(
			(value: TemplateLanguage) => {
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
					{sortButtonsLabels?.map(({ filterBy, label }) => (
						<Button
							active={filterBy === filters?.filterBy}
							className={`w-full justify-start font-normal transition-all will-change-[font-weight,background-color] data-[active=true]:bg-primary-600 
						data-[active=true]:font-semibold data-[active=true]:text-white`}
							key={label}
							onClick={() => onFilterClick({ filterBy })}
							variant='ghost'>
							{label}
						</Button>
					))}
				</div>

				<Separator />

				<div className='h-[calc(100%-168px)] space-y-1 overflow-y-auto'>
					<CollapsibleSection label='Industries'>
						<SearchInput
							className='overflow-visible'
							onChange={onIndustrySearch}
							value={industrySearchTerm}
							variant='underlined'
						/>

						<div className='flex max-h-[250px] w-full flex-col gap-1 overflow-y-auto'>
							{!list?.length ? (
								<NoResultsFound />
							) : (
								list?.map(({ id: industryId, name }) => (
									<Button
										active={
											filters?.industryId ? industryId === filters?.industryId : industryId === defaultUserIndustryId
										}
										className={`h-max w-full max-w-[80%] shrink-0 justify-start whitespace-break-spaces p-2 text-start font-normal text-[#054060] 
									data-[active=true]:bg-[#C8E0EE] data-[active=true]:text-[#054060] hover:bg-[#C8E0EE]`}
										key={industryId}
										onClick={() => onFilterClick({ industryId })}
										variant='ghost'>
										{name}
									</Button>
								))
							)}
						</div>
					</CollapsibleSection>
					<CollapsibleSection label='Type'>
						{templateTypesOptions?.map(({ label, value }) => (
							<div className='flex flex-row items-center space-x-3 space-y-0 ps-3' key={value}>
								<Checkbox
									checked={filters?.types?.includes(value)}
									id={value}
									onCheckedChange={() => onTemplateTypeCheck(value)}
								/>
								<Label className='cursor-pointer p-0 transition-basic hover:text-primary-900' htmlFor={value}>
									{label}
								</Label>
							</div>
						))}
					</CollapsibleSection>
					<CollapsibleSection label='Language'>
						{templateLanguagesOptions?.map(({ label, value }) => (
							<div className='flex flex-row items-center space-x-3 space-y-0 ps-3' key={value}>
								<Checkbox
									checked={filters?.languages?.includes(value)}
									id={value}
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
)

SmsPrebuiltTemplatesFiltersContent.displayName = "SmsPrebuiltTemplatesFiltersContent"

export default SmsPrebuiltTemplatesFiltersContent

const sortButtonsLabels: { filterBy?: PrebuiltTemplateFilter["filterBy"]; label: string }[] = [
	{ filterBy: "ALL", label: "All Templates" },
	{ filterBy: "RECENT", label: "Recently Added" },
	{ filterBy: "POPULAR", label: "Most Popular" },
]

const CollapsibleSection = ({ children, label }: { children: React.ReactNode; label: string }) => (
	<Collapsible className='w-full overflow-hidden rounded-lg px-4 text-start transition-basic data-[state=open]:bg-primary-50/30'>
		<Collapsible.Trigger className='rounded-md p-3 transition-basic hover:bg-primary-50/20' showArrow>
			<span className='flex-1 whitespace-nowrap text-start transition-[opacity] duration-300 ease-in-out'>{label}</span>
		</Collapsible.Trigger>
		<Collapsible.Content>
			<div className='flex h-full w-full flex-col gap-4 overflow-hidden py-2'>{children}</div>
		</Collapsible.Content>
	</Collapsible>
)
