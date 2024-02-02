//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateValue } from "@/core/slices/advanced-table-slice"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"

import { useGetGroupsQuery } from "../api"
import type { Group } from "../types"
import GroupsViewSkeleton from "../views/groups-view/skeleton"

const GroupsView = lazy(() => import("../views/groups-view"))
const EmptyGroupsView = lazy(() => import("../views/empty-groups-view"))
const DisplayError = lazy(() => import("@/ui").then((mod) => ({ default: mod.DisplayError })))
//#endregion

const GroupsRoute = () => {
	const { offset, limit, sort, order, filters, searchTerm, appliedFiltersCount } = useSelector<
		AdvancedTableStateValue<Group>
	>(({ advancedTable }) => advancedTable["groups"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetGroupsQuery(
		{
			limit,
			offset,
			sort,
			order,
			name: searchTerm,
			// date range filter:
			startDate: getValueFromSafeObject("startDate", filters?.dateRange),
			endDate: getValueFromSafeObject("endDate", filters?.dateRange),
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

	if (isInitialLoading) return <GroupsViewSkeleton />

	if (isEmptyView) return <EmptyGroupsView />

	if (isError) return <DisplayError error={error as any} />

	if (isReady) return <GroupsView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default GroupsRoute
