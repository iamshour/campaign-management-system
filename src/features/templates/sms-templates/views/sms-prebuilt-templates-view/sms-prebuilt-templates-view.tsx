import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateAdvancedTableState } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import { SharedListViewProps } from "@/core/types"
import type { SmsPrebuiltTemplateType } from "@/features/templates/sms-templates/types"
import { SearchInput } from "@/ui"

import SmsPrebuiltTemplateCard from "./sms-prebuilt-template-card"
import SmsPrebuiltTemplatesViewFilters from "./sms-prebuilt-templates-view-filters-bar"

const SmsPrebuiltTemplatesView = ({ list, isFetching }: SharedListViewProps<SmsPrebuiltTemplateType>) => {
	const dispatch = useDispatch()

	const searchTerm = useSelector(({ advancedTable }) => advancedTable["sms-prebuilt-templates"]?.searchTerm)

	return (
		<div className='flex h-full w-full flex-1 overflow-hidden'>
			<SmsPrebuiltTemplatesViewFilters />

			<div className='flex h-full w-full flex-1 flex-col gap-4 overflow-hidden p-4 pb-0'>
				<SearchInput
					value={searchTerm}
					onChange={(searchTerm) => dispatch(updateAdvancedTableState({ "sms-prebuilt-templates": { searchTerm } }))}
				/>

				<div className='grid flex-1 justify-evenly gap-6 overflow-y-auto p-4 [grid-template-columns:repeat(auto-fit,377px)]'>
					{list?.map((prebuiltTemplate) => (
						<SmsPrebuiltTemplateCard
							className={isFetching ? "opacity-50" : undefined}
							key={prebuiltTemplate?.id}
							{...prebuiltTemplate}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default SmsPrebuiltTemplatesView
