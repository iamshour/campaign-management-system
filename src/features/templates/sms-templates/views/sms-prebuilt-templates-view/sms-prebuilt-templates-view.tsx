//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { SmsIndustryTemplateType } from "@/features/industries/types"

import { updatePaginationAndSorting, updateSearch } from "@/core/components/data-view/data-view-slice"
import appPaths from "@/core/constants/app-paths"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { NoResultsFound, SearchInput } from "@/ui"
import { lazy } from "react"
import { Link, useLocation } from "react-router-dom"

import SmsPrebuiltTemplateCard from "./sms-prebuilt-template-card"

const SmsPrebuiltTemplatesFilters = lazy(
	() => import("./sms-prebuilt-templates-filters/sms-prebuilt-templates-filters")
)

const Pagination = lazy(() => import("@/ui/pagination/pagination"))
//#endregion

export interface SmsPrebuiltTemplatesViewProps
	extends SharedListViewProps<SmsIndustryTemplateType>,
		Pick<React.ComponentPropsWithoutRef<typeof SmsPrebuiltTemplatesFilters>, "prebuiltTemplatesGridKey"> {}

const SmsPrebuiltTemplatesView = ({
	count,
	isFetching,
	list,
	prebuiltTemplatesGridKey,
}: SmsPrebuiltTemplatesViewProps) => {
	const { pathname } = useLocation()

	const dispatch = useDispatch()

	const { paginationAndSorting, searchTerm } = useSelector(({ dataView }) => dataView[prebuiltTemplatesGridKey])

	return (
		<div className='flex h-full w-full flex-1 overflow-hidden'>
			<SmsPrebuiltTemplatesFilters prebuiltTemplatesGridKey={prebuiltTemplatesGridKey} />

			<div className='flex h-full w-full flex-1 flex-col overflow-hidden p-4 pb-0'>
				<SearchInput
					className='mb-4 w-[14rem] !max-w-full md:w-[18rem]'
					onChange={(searchTerm) => dispatch(updateSearch({ [prebuiltTemplatesGridKey]: searchTerm }))}
					value={searchTerm}
				/>

				<div className='flex-1 overflow-y-auto'>
					{!list?.length ? (
						<NoResultsFound />
					) : (
						<div className='flex flex-wrap gap-6 p-4 pt-0'>
							{list.map(({ backgroundImage, id, ...prebuiltTemplateDetails }) => (
								<Link key={id} state={{ from: pathname }} to={`${appPaths.SMS_TEMPLATES_PREBUILT_TEMPLATES}/${id}`}>
									<SmsPrebuiltTemplateCard
										backgroundImage={`data:image;base64,${backgroundImage}`}
										className={isFetching ? "opacity-50" : undefined}
										{...prebuiltTemplateDetails}
									/>
								</Link>
							))}
						</div>
					)}
				</div>

				<Pagination
					count={count}
					pageLimits={[10, 20, 30]}
					pagination={{ limit: paginationAndSorting?.limit, offset: paginationAndSorting?.offset }}
					updatePagination={(pagination) =>
						dispatch(updatePaginationAndSorting({ [prebuiltTemplatesGridKey]: pagination }))
					}
				/>
			</div>
		</div>
	)
}

export default SmsPrebuiltTemplatesView
