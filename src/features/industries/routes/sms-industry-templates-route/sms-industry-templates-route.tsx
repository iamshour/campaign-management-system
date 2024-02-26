//#region Import
import type { DataGridState } from "@/core/slices/data-grid-slice/types"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetSmsIndustryTemplatesQuery } from "@/features/industries/api"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const SmsTemplatesEmptyView = lazy(() => import("@/features/templates/sms-templates/views/sms-templates-empty-view"))

const SmsIndustryTemplatesView = lazy(
	() => import("@/features/industries/views/sms-industry-templates-view/sms-industry-templates-view")
)
//#endregion

const SmsIndustryTemplatesRoute = () => {
	const { industryId } = useParams()

	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector<
		DataGridState<"sms-industry-templates">
	>(({ dataGrid }) => dataGrid["sms-industry-templates"])

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } =
		useGetSmsIndustryTemplatesQuery(
			{
				industryId,
				...paginationAndSorting,
				...filters,
				...getSearchFilter<["name"]>(searchTerm, ["name"]),
			},
			{
				selectFromResult: ({ data, isFetching, isLoading, isSuccess, ...rest }) => ({
					count: data?.count,
					isEmptyView:
						!isFetching && !!isSuccess && !data?.list?.length && !(appliedFiltersCount || !!searchTerm?.length),
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

	if (isReady) return <SmsIndustryTemplatesView count={count || 0} isFetching={isFetching} list={list || []} />
}

export default SmsIndustryTemplatesRoute
