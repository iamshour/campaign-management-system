//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"
import { useGetIndustriesQuery } from "@/features/industries/api"
import { DataTableSkeleton } from "@/ui"

const IndustriesView = lazy(() => import("@/features/industries/views/industries-view/industries-view"))
const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const IndustriesRoute = () => {
	const { offset, limit, sort, order, searchTerm, filters, appliedFiltersCount } = useSelector<
		AdvancedTableStateType<"industries">
	>(({ advancedTable }) => advancedTable["industries"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetIndustriesQuery(
		{
			offset,
			limit,
			sort,
			order,
			name: searchTerm,
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

	if (isEmptyView) return <>Industries Empty View</>

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady) return <IndustriesView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default IndustriesRoute
