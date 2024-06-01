//#region Import
import type { DataViewState } from "@/core/components/data-view/types"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetGroupsQuery } from "@/features/people/groups/api"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"

const GroupsView = lazy(() => import("@/features/people/groups/views/groups-view/groups-view"))

const GroupsEmptyView = lazy(() => import("@/features/people/groups/views/groups-empty-view"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const GroupsRoute = () => {
	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector<DataViewState<"groups">>(
		({ dataView }) => dataView["groups"]
	)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } = useGetGroupsQuery(
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

	if (isEmptyView) return <GroupsEmptyView />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady) return <GroupsView count={count || 0} isFetching={isFetching} list={list || []} />
}

export default GroupsRoute
