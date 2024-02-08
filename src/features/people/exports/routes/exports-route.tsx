//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"
import { DisplayError, DataTableSkeleton } from "@/ui"

import { useGetExportsQuery } from "../api"

const ExportsView = lazy(() => import("../views/exports-view"))
const EmptyExportsView = lazy(() => import("../views/empty-exports-view"))
//#endregion

const ExportsRoute = () => {
	const { offset, limit, filters, searchTerm, appliedFiltersCount } = useSelector<
		AdvancedTableStateType<"contacts-exports">
	>(({ advancedTable }) => advancedTable["contacts-exports"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetExportsQuery(
		{
			limit,
			offset,
			sort: "createdAt",
			order: "desc",
			fileName: searchTerm,
			any: searchTerm ? true : undefined,
			startDate: getValueFromSafeObject("startDate", filters?.dateRange),
			endDate: getValueFromSafeObject("endDate", filters?.dateRange),
			statuses: filters?.status?.length ? filters.status : undefined,
			exportedBy: filters?.exportedBy?.length ? filters.exportedBy : undefined,
		},
		{
			selectFromResult: ({ data, isLoading, isFetching, isSuccess, ...rest }) => {
				return {
					list: data?.list,
					count: data?.count,
					isInitialLoading: !data && isLoading,
					isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
					isEmptyView: !isFetching && !!isSuccess && !data && !(appliedFiltersCount || !!searchTerm?.length),
					isFetching,
					...rest,
				}
			},
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <EmptyExportsView />

	if (isError) return <DisplayError error={error as any} />

	if (isReady) return <ExportsView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default ExportsRoute
