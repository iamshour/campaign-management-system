//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"
import { DataTableSkeleton } from "@/ui"

import { useGetGroupsQuery } from "../api"

const GroupsView = lazy(() => import("../views/groups-view/groups-view"))
const GroupsEmptyView = lazy(() => import("../views/groups-empty-view"))
const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const GroupsRoute = () => {
	const { offset, limit, sort, order, filters, searchTerm, appliedFiltersCount } = useSelector<
		AdvancedTableStateType<"groups">
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

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <GroupsEmptyView />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady) return <GroupsView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default GroupsRoute
