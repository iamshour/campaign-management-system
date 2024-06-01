//#region Import
import type { DataViewState } from "@/core/components/data-view/types"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetSegmentsQuery } from "@/features/people/segments/api"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"

const SegmentsView = lazy(() => import("@/features/people/segments/views/segments-view/segments-view"))

const SegmentsEmptyView = lazy(() => import("@/features/people/segments/views/segments-empty-view"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const SegmentsRoute = () => {
	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector<DataViewState<"segments">>(
		({ dataView }) => dataView["segments"]
	)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } = useGetSegmentsQuery(
		{
			...filters,
			...getSearchFilter<["name"]>(searchTerm, ["name"]),
			...paginationAndSorting,
		},
		{
			selectFromResult: ({ data, isFetching, isLoading, isSuccess, ...rest }) => ({
				count: data?.count,
				isEmptyView: !isFetching && !!isSuccess && !data?.count && !(appliedFiltersCount || !!searchTerm?.length),
				isFetching,
				isInitialLoading: !data && isLoading,
				isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
				list: data?.list,
				...rest,
			}),
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <SegmentsEmptyView />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady) return <SegmentsView count={count || 0} isFetching={isFetching} list={list || []} />
}

export default SegmentsRoute
