//#region Import
import { useState } from "react"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { updateFilters } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import { useGetIndustryListQuery } from "@/features/industries/api"
import smsTemplateLanguagesOptions from "@/features/templates/sms-templates/constants/sms-template-languages-options"
import type {
	SmsPrebuiltTemplatesTableFiltersType,
	SmsTemplateLanguageOption,
	SmsTemplateTypeOption,
} from "@/features/templates/sms-templates/types"
import {
	DisplayError,
	SearchInput,
	Skeleton,
	Separator,
	Button,
	Collapsible,
	Label,
	Checkbox,
	type CheckedState,
} from "@/ui"

import smsTemplateTypesOptions from "../../constants/sms-template-types-options"
//#endregion

type OnCheckPayloadType =
	| { key: "templateType"; value: SmsTemplateTypeOption }
	| { key: "templateLanguage"; value: SmsTemplateLanguageOption }

const SmsPrebuiltTemplatesViewFiltersBar = () => {
	const dispatch = useDispatch()
	const [searchTerm, setSearchTerm] = useState<string>()

	const { filters } = useSelector<AdvancedTableStateType<"sms-prebuilt-templates">>(
		({ advancedTable }) => advancedTable["sms-prebuilt-templates"]
	)

	const { data, isLoading, isError, error } = useGetIndustryListQuery(
		{ name: searchTerm, offset: 0, limit: 50 },
		baseQueryConfigs
	)

	const onCheckTemplateType = (checked: CheckedState, { key, value }: OnCheckPayloadType) => {
		let updatedFilter: (typeof value)[] = []

		if (!filters?.[key]) {
			updatedFilter = [value]
		} else if (checked) {
			updatedFilter = filters?.[key] ? [...filters[key]!, value] : [value]
		} else {
			updatedFilter = filters?.[key]?.filter((item) => item !== value) || []
		}

		dispatch(updateFilters({ "sms-prebuilt-templates": { [key]: updatedFilter } }))
	}

	if (isLoading) return <Skeleton className='h-full bg-white' />
	if (isError) return <DisplayError error={error as any} />

	return (
		<div className='z-10 flex h-full w-[300px] flex-col overflow-hidden bg-[#edf3f7]'>
			<div className='w-full space-y-2 p-4'>
				{sortButtonsLabels?.map(({ label, filterBy }, idx) => (
					<Button
						key={label}
						variant='ghost'
						active={(!filters?.filterBy && idx === 0) || filterBy === filters?.filterBy}
						className='w-full justify-start font-normal data-[active=true]:bg-primary-600 data-[active=true]:font-semibold data-[active=true]:text-white'
						onClick={() => dispatch(updateFilters({ "sms-prebuilt-templates": { filterBy } }))}>
						{label}
					</Button>
				))}
			</div>

			<Separator />

			<div className='h-[calc(100%-168px)] overflow-y-auto border-b'>
				<CollapsibleButton label='Industries'>
					<SearchInput className='overflow-visible' variant='underlined' value={searchTerm} onChange={setSearchTerm} />

					<div className='flex max-h-[300px] w-full flex-col gap-1 overflow-y-auto'>
						{data?.list?.map(({ id, name: industryId }) => (
							<Button
								key={id}
								variant='ghost'
								active={filters?.industryId === industryId}
								className='h-max w-full max-w-[80%] shrink-0 justify-start whitespace-break-spaces p-2 text-start font-normal data-[active=true]:bg-primary-600/20'
								onClick={() => dispatch(updateFilters({ "sms-prebuilt-templates": { industryId } }))}>
								{industryId}
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
								onCheckedChange={(checked) => onCheckTemplateType(checked, { key: "templateType", value })}
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
								onCheckedChange={(checked) => onCheckTemplateType(checked, { key: "templateLanguage", value })}
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

export default SmsPrebuiltTemplatesViewFiltersBar

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
