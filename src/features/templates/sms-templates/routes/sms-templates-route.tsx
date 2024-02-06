//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"
import { DataTableSkeleton } from "@/ui"

import { useGetSmsTemplatesQuery } from "../api"

const SmsTemplatesView = lazy(() => import("../views/sms-templates-view/sms-templates-view"))
const EmptySmsTemplatesView = lazy(() => import("../views/empty-sms-templates-view"))
const DisplayError = lazy(() => import("@/ui").then(({ DisplayError }) => ({ default: DisplayError })))
//#endregion

const SmsTemplatesRoute = () => {
	const { offset, limit, order, sort, filters, searchTerm, appliedFiltersCount } = useSelector<
		AdvancedTableStateType<"sms-templates">
	>(({ advancedTable }) => advancedTable["sms-templates"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetSmsTemplatesQuery(
		{
			limit,
			offset,
			sort,
			order,
			name: searchTerm,
			any: searchTerm ? true : undefined,
			startDate: getValueFromSafeObject("startDate", filters?.dateRange),
			endDate: getValueFromSafeObject("endDate", filters?.dateRange),
			statuses: filters?.templateStatus,
			types: filters?.templateType,
			languages: filters?.templateLanguage,
		},
		{
			selectFromResult: ({ data, isLoading, isFetching, isSuccess, ...rest }) => {
				return {
					list: data?.list?.slice(offset, limit),
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

	if (isEmptyView) return <EmptySmsTemplatesView />

	if (isError) return <DisplayError error={error as any} />

	if (isReady) return <SmsTemplatesView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default SmsTemplatesRoute
