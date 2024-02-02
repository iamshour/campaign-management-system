//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateValue } from "@/core/slices/advanced-table-slice"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"
import { DataTableSkeleton } from "@/ui"

import { useGetSmsTemplatesQuery } from "../api"
import { SmsTemplate } from "../types"

const MySmsTemplatesView = lazy(() => import("../views/my-sms-templates-view"))
const EmptyMySmsTemplatesView = lazy(() => import("../views/empty-my-sms-templates-view"))

const DisplayError = lazy(() => import("@/ui").then(({ DisplayError }) => ({ default: DisplayError })))
//#endregion

const MySmsTemplatesRoute = () => {
	const { offset, limit, order, sort, filters, searchTerm, appliedFiltersCount } = useSelector<
		AdvancedTableStateValue<SmsTemplate>
	>(({ advancedTable }) => advancedTable["sms-templates"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetSmsTemplatesQuery(
		{
			limit,
			offset,
			sort,
			order,
			name: searchTerm,
			any: searchTerm ? true : undefined,
			// date range filter:
			startDate: getValueFromSafeObject("startDate", filters?.dateRange),
			endDate: getValueFromSafeObject("endDate", filters?.dateRange),
			// status filter:
			statuses: filters?.templateStatus?.length ? filters.templateStatus : undefined,
			// type filter:
			types: filters?.templateType?.length ? filters.templateType : undefined,
			// language filter:
			languages: filters?.templateLanguage?.length ? filters.templateLanguage : undefined,
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

	if (isEmptyView) return <EmptyMySmsTemplatesView />

	if (isError) return <DisplayError error={error as any} />

	if (isReady) return <MySmsTemplatesView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default MySmsTemplatesRoute
