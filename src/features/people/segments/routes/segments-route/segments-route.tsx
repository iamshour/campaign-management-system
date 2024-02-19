//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import { getContactSearchFilter } from "@/features/people/contacts/utils"
import { useGetSegmentsQuery } from "@/features/people/segments/api"
import { DataTableSkeleton } from "@/ui"

const SegmentsView = lazy(() => import("@/features/people/segments/views/segments-view/segments-view"))
const SegmentsEmptyView = lazy(() => import("@/features/people/segments/views/segments-empty-view"))
const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const SegmentsRoute = () => {
	const { offset, limit, order, sort, appliedFiltersCount, searchTerm } = useSelector<DataGridState<"segments">>(
		({ dataGrid }) => dataGrid["segments"]
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

	if (isEmptyView) return <SegmentsEmptyView />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady) return <SegmentsView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default SegmentsRoute
