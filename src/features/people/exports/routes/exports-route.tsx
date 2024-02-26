//#region Import
import type { DataGridState } from "@/core/slices/data-grid-slice/types"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetExportsQuery } from "@/features/people/exports/api"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"

const ExportsView = lazy(() => import("@/features/people/exports/views/exports-view/exports-view"))

const ExportsEmptyView = lazy(() => import("@/features/people/exports/views/exports-empty-view"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const ExportsRoute = () => {
	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector<
		DataGridState<"contacts-exports">
	>(({ dataGrid }) => dataGrid["contacts-exports"])

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } = useGetExportsQuery(
		{
			...filters,
			...getSearchFilter<["fileName"]>(searchTerm, ["fileName"]),
			...paginationAndSorting,
			order: "desc",
			sort: "createdAt",
		},
		{
			selectFromResult: ({ data, isFetching, isLoading, isSuccess, ...rest }) => ({
				count: data?.count,
				isEmptyView: !isFetching && !!isSuccess && !data && !(appliedFiltersCount || !!searchTerm?.length),
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

	if (isEmptyView) return <ExportsEmptyView />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady) return <ExportsView count={count || 0} isFetching={isFetching} list={list || []} />
}

export default ExportsRoute
