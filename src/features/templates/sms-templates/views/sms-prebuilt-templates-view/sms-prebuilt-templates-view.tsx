//#region Import
import { lazy, useCallback } from "react"
import { Link } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateDataGridState } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import type { SharedListViewProps } from "@/core/types"
import type { SmsIndustryTemplateType } from "@/features/industries/types"
import { NoResultsFound, SearchInput } from "@/ui"

import SmsPrebuiltTemplateCard from "./sms-prebuilt-template-card"

const SmsPrebuiltTemplatesFilters = lazy(
	() => import("./sms-prebuilt-templates-filters/sms-prebuilt-templates-filters")
)
const TablePagination = lazy(() => import("@/ui/table/table-pagination"))
//#endregion

export interface SmsPrebuiltTemplatesViewProps
	extends SharedListViewProps<SmsIndustryTemplateType>,
		Pick<React.ComponentPropsWithoutRef<typeof SmsPrebuiltTemplatesFilters>, "prebuiltTemplatesGridKey"> {}

const SmsPrebuiltTemplatesView = ({
	prebuiltTemplatesGridKey,
	list,
	isFetching,
	count,
}: SmsPrebuiltTemplatesViewProps) => {
	const dispatch = useDispatch()

	const { offset, limit } = useSelector<DataGridState<typeof prebuiltTemplatesGridKey>>(
		({ dataGrid }) => dataGrid[prebuiltTemplatesGridKey]
	)

	const updateState = useCallback(
		(newState: Partial<DataGridState<typeof prebuiltTemplatesGridKey>>) => {
			dispatch(updateDataGridState({ [prebuiltTemplatesGridKey]: newState }))
		},
		[dispatch, prebuiltTemplatesGridKey]
	)

	return (
		<div className='flex h-full w-full flex-1 overflow-hidden'>
			<SmsPrebuiltTemplatesFilters prebuiltTemplatesGridKey={prebuiltTemplatesGridKey} />

			<div className='flex h-full w-full flex-1 flex-col overflow-hidden p-4 pb-0'>
				<SearchInput className='mb-4' onChange={(searchTerm) => updateState({ searchTerm })} />

				<div className='flex-1'>
					{!list?.length ? (
						<NoResultsFound />
					) : (
						<div className='flex flex-wrap gap-6 overflow-y-auto p-4 pt-0'>
							{list.map(({ id, backgroundImage, ...prebuiltTemplateDetails }) => (
								<Link key={id} to={`${appPaths.SMS_TEMPLATES_PREBUILT_TEMPLATES}/${id}`}>
									<SmsPrebuiltTemplateCard
										className={isFetching ? "opacity-50" : undefined}
										backgroundImage={`data:image;base64,${backgroundImage}`}
										{...prebuiltTemplateDetails}
									/>
								</Link>
							))}
						</div>
					)}
				</div>

				<TablePagination
					pageLimits={[10, 20, 30]}
					pagination={{ offset, limit }}
					count={count}
					updatePagination={updateState}
				/>
			</div>
		</div>
	)
}

export default SmsPrebuiltTemplatesView
