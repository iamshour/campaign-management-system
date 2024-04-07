//#region Import
import type { DataViewState } from "@/core/components/data-view/types"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetSmsTemplatesQuery } from "@/features/templates/sms-templates/api"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"

const SmsTemplatesView = lazy(
	() => import("@/features/templates/sms-templates/views/sms-templates-view/sms-templates-view")
)

const SmsTemplatesEmptyView = lazy(() => import("@/features/templates/sms-templates/views/sms-templates-empty-view"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const SmsTemplatesRoute = () => {
	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector<
		DataViewState<"sms-templates">
	>(({ dataView }) => dataView["sms-templates"])

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } = useGetSmsTemplatesQuery(
		{
			...paginationAndSorting,
			...filters,
			...getSearchFilter<["name"]>(searchTerm, ["name"]),
		},
		{
			selectFromResult: ({ data, isFetching, isLoading, isSuccess, ...rest }) => ({
				count: data?.count,
				isEmptyView: !isFetching && !!isSuccess && !data?.list?.length && !(appliedFiltersCount || searchTerm),
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

	if (isEmptyView) return <SmsTemplatesEmptyView />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady) return <SmsTemplatesView count={count || 0} isFetching={isFetching} list={list || []} />
}

export default SmsTemplatesRoute
