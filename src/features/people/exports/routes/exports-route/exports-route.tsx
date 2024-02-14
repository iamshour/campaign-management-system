//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"
import { useGetExportsQuery } from "@/features/people/exports/api"
import { DataTableSkeleton } from "@/ui"

const ExportsView = lazy(() => import("@/features/people/exports/views/exports-view/exports-view"))
const ExportsEmptyView = lazy(() => import("@/features/people/exports/views/exports-empty-view"))
const DisplayError = lazy(() => import("@/ui/errors/display-error"))
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

	if (isEmptyView) return <ExportsEmptyView />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady) return <ExportsView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default ExportsRoute
