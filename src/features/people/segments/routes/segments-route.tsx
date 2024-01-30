//#region Import
import { lazy } from "react"
import { DisplayError, DataTableSkeleton } from "@blueai/ui"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { AdvancedTableStateValue } from "@/core/slices/advanced-table-slice"

import { getContactSearchFilter } from "../../contacts/utils"
import { useGetSegmentsQuery } from "../api"
import { Segment } from "../types"

const SegmentsView = lazy(() => import("../views/segments-view"))
const EmptySegmentsView = lazy(() => import("../views/empty-segments-view"))
//#endregion

const SegmentsRoute = () => {
	const { offset, limit, order, sort, appliedFiltersCount, searchTerm } = useSelector<AdvancedTableStateValue<Segment>>(
		({ advancedTable }) => advancedTable["segments"]
	)

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetSegmentsQuery(
		{
			limit,
			offset,
			sort,
			order,
			...getContactSearchFilter(searchTerm),
		},
		{
			selectFromResult: ({ data, isLoading, isFetching, isSuccess, ...rest }) => ({
				list: data?.list,
				count: data?.count,
				isInitialLoading: !data && isLoading,
				isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
				isEmptyView: !isFetching && !!isSuccess && !data && !(appliedFiltersCount || !!searchTerm?.length),
				isFetching,
				...rest,
			}),
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	// If no entries were found at all
	if (isEmptyView) return <EmptySegmentsView />

	if (isError) return <DisplayError error={error} />

	if (isReady) return <SegmentsView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default SegmentsRoute
