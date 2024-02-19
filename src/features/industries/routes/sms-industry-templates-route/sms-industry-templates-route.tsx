//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import { useGetSmsIndustryTemplatesQuery } from "@/features/industries/api"
import { DataTableSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const SmsTemplatesEmptyView = lazy(() => import("@/features/templates/sms-templates/views/sms-templates-empty-view"))
const SmsIndustryTemplatesView = lazy(
	() => import("@/features/industries/views/sms-industry-templates-view/sms-industry-templates-view")
)
//#endregion

const SmsIndustryTemplatesRoute = () => {
	const { industryId } = useParams()

	const { sort, order, offset, limit, filters, appliedFiltersCount, searchTerm } = useSelector<
		DataGridState<"sms-industry-templates">
	>(({ dataGrid }) => dataGrid["sms-industry-templates"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } =
		useGetSmsIndustryTemplatesQuery(
			{
				industryId,
				limit,
				offset,
				sort,
				order,
				name: searchTerm,
				any: searchTerm ? true : undefined,
				statuses: filters?.statuses,
				types: filters?.types,
				languages: filters?.languages,
				updatedAfter: filters?.updatedAfter,
				updatedBefore: filters?.updatedBefore,
			},
			{
				selectFromResult: ({ data, isLoading, isFetching, isSuccess, ...rest }) => ({
					list: data?.list,
					count: data?.count,
					isInitialLoading: !data && isLoading,
					isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
					isEmptyView:
						!isFetching && !!isSuccess && !data?.list?.length && !(appliedFiltersCount || !!searchTerm?.length),
					isFetching,
					...rest,
				}),
				...baseQueryConfigs,
			}
		)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <SmsTemplatesEmptyView />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady) return <SmsIndustryTemplatesView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default SmsIndustryTemplatesRoute
