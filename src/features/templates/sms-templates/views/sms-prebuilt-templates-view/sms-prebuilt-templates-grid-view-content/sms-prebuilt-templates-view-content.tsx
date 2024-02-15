//#region Import
import { Suspense, lazy, useCallback } from "react"
import { Link } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateAdvancedTableState } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import type { SharedListViewProps } from "@/core/types"
import type { SmsIndustryTemplateType } from "@/features/industries/types"
import { DisplayError, SearchInput, Skeleton } from "@/ui"

import SmsPrebuiltTemplateCard from "./sms-prebuilt-template-card"
const SmsPrebuiltTemplatesFiltersContent = lazy(
	() => import("./sms-prebuilt-templates-filters/sms-prebuilt-templates-filters")
)
const TablePagination = lazy(() => import("@/ui/table/table-pagination"))
//#endregion

export interface SmsPrebuiltTemplatesViewContentProps extends SharedListViewProps<SmsIndustryTemplateType> {
	/**
	 * Optional prop used to append additional children to the header component, along the `SearchInput` component, such as a CTA Button
	 */
	headerChildren?: React.ReactNode
}

const SmsPrebuiltTemplatesViewContent = ({
	list,
	isFetching,
	count,
	headerChildren,
}: SmsPrebuiltTemplatesViewContentProps) => {
	const dispatch = useDispatch()

	const { offset, limit } = useSelector<AdvancedTableStateType<"sms-prebuilt-templates">>(
		({ advancedTable }) => advancedTable["sms-prebuilt-templates"]
	)

	const updateState = useCallback(
		(newState: Partial<AdvancedTableStateType<"sms-prebuilt-templates">>) => {
			dispatch(updateAdvancedTableState({ "sms-prebuilt-templates": newState }))
		},
		[dispatch]
	)

	return (
		<div className='flex h-full w-full flex-1 overflow-hidden'>
			<Suspense fallback={<Skeleton className='h-full w-[300px]' />}>
				<SmsPrebuiltTemplatesFiltersContent />
			</Suspense>

			<div className='flex h-full w-full flex-1 flex-col overflow-hidden p-4 pb-0'>
				<header className='mb-4 flex w-full items-center justify-between'>
					<SearchInput onChange={(searchTerm) => updateState({ searchTerm })} />
					{headerChildren}
				</header>

				{!list?.length ? (
					<DisplayError />
				) : (
					<div className='grid flex-1 justify-evenly gap-6 overflow-y-auto p-4 pt-0 [grid-template-columns:repeat(auto-fit,377px)] [grid-template-rows:repeat(auto-fit,285px)]'>
						{list.map(({ id, ...prebuiltTemplateDetails }) => (
							<Link key={id} to={`${appPaths.SMS_TEMPLATES_PREBUILT_TEMPLATES}/${id}`}>
								<SmsPrebuiltTemplateCard
									className={isFetching ? "opacity-50" : undefined}
									{...prebuiltTemplateDetails}
								/>
							</Link>
						))}
					</div>
				)}

				<Suspense
					fallback={
						<div className='h-[72px] p-4'>
							<Skeleton className='h-full' />
						</div>
					}>
					<TablePagination
						pageLimits={[10, 20, 30]}
						pagination={{ offset, limit }}
						count={count}
						updatePagination={updateState}
					/>
				</Suspense>
			</div>
		</div>
	)
}

export default SmsPrebuiltTemplatesViewContent
