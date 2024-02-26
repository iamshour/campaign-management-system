//#region Import
import type { DataGridState } from "@/core/slices/data-grid-slice/types"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetIndustriesQuery } from "@/features/industries/api"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"

const IndustriesView = lazy(() => import("@/features/industries/views/industries-view/industries-view"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const IndustriesRoute = () => {
	const { filters, paginationAndSorting, searchTerm } = useSelector<DataGridState<"industries">>(
		({ dataGrid }) => dataGrid["industries"]
	)

	const { count, error, isError, isFetching, isInitialLoading, isReady, list } = useGetIndustriesQuery(
		{
			...filters,
			...getSearchFilter<["name"]>(searchTerm, ["name"]),
			...paginationAndSorting,
		},
		{
			selectFromResult: ({ data, isFetching, isLoading, ...rest }) => ({
				count: data?.count,
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

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady) return <IndustriesView count={count || 0} isFetching={isFetching} list={list || []} />
}

export default IndustriesRoute
