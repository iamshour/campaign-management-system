//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"
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
		AdvancedTableStateType<"sms-industry-templates">
	>(({ advancedTable }) => advancedTable["sms-industry-templates"])

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
				status: filters?.templateStatus,
				type: filters?.templateType,
				language: filters?.templateLanguage,
				updatedAfter: getValueFromSafeObject("startDate", filters?.dateRange),
				updatedBefore: getValueFromSafeObject("endDate", filters?.dateRange),
			},
			{
				selectFromResult: ({ data, isLoading, isFetching, isSuccess, ...rest }) => ({
					list: data?.list?.slice(offset, limit),
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
