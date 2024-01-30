//#region Import
import DisplayError from "@package/ui/src/errors/display-error"
import DataTableSkeleton from "@package/ui/src/skeletons/data-table-skeleton"
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateValue } from "@/core/slices/advanced-table-slice"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"

import { useGetExportsQuery } from "../api"
import type { ContactExports } from "../types"

const ExportsView = lazy(() => import("../views/exports-view"))
const EmptyExportsView = lazy(() => import("../views/empty-exports-view"))
//#endregion

const ExportsRoute = () => {
	const { offset, limit, order, sort, filters, searchTerm, appliedFiltersCount } = useSelector<
		AdvancedTableStateValue<ContactExports>
	>(({ advancedTable }) => advancedTable["contacts-exports"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetExportsQuery(
		{
			limit,
			offset,
			sort,
			order,
			fileName: searchTerm,
			any: searchTerm ? true : undefined,
			// date range filter:
			startDate: getValueFromSafeObject("startDate", filters?.dateRange),
			endDate: getValueFromSafeObject("endDate", filters?.dateRange),
			// status filter:
			statuses: filters?.status?.length ? filters.status : undefined,
			// exported by filter:
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

	if (isError) return <DisplayError error={error} />

	if (isReady) return <ExportsView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default ExportsRoute
