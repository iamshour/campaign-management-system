//#region Import
import { Suspense, lazy, useCallback } from "react"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateAdvancedTableState } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import { SharedListViewProps } from "@/core/types"
import type { SmsPrebuiltTemplateType } from "@/features/templates/sms-templates/types"
import { DisplayError, SearchInput, Skeleton } from "@/ui"

import SmsPrebuiltTemplateCard from "./sms-prebuilt-template-card"
const SmsPrebuiltTemplatesFiltersContent = lazy(
	() => import("./sms-prebuilt-templates-filters/sms-prebuilt-templates-filters")
)
const TablePagination = lazy(() => import("@/ui").then((mod) => ({ default: mod.TablePagination })))
//#endregion

export interface SmsPrebuiltTemplatesViewContentProps extends SharedListViewProps<SmsPrebuiltTemplateType> {
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

	const { offset, limit } = useSelector(({ advancedTable }) => advancedTable["sms-prebuilt-templates"])

	const onTemplatesSearch = useCallback(
		(searchTerm?: string) => {
			dispatch(updateAdvancedTableState({ "sms-prebuilt-templates": { searchTerm } }))
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
					<SearchInput onChange={onTemplatesSearch} />
					{headerChildren}
				</header>

				{!list?.length ? (
					<DisplayError />
				) : (
					<div className='grid flex-1 justify-evenly gap-6 overflow-y-auto p-4 pt-0 [grid-template-columns:repeat(auto-fit,377px)]'>
						{list.map((prebuiltTemplate) => (
							<SmsPrebuiltTemplateCard
								className={isFetching ? "opacity-50" : undefined}
								key={prebuiltTemplate?.id}
								{...prebuiltTemplate}
							/>
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
						updatePagination={(pagination) =>
							dispatch(updateAdvancedTableState({ "sms-prebuilt-templates": pagination }))
						}
					/>
				</Suspense>
			</div>
		</div>
	)
}

export default SmsPrebuiltTemplatesViewContent
