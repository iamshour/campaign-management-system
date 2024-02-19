//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import { useGetSmsTemplatesQuery } from "@/features/templates/sms-templates/api"
import { DataTableSkeleton } from "@/ui"

const SmsTemplatesView = lazy(
	() => import("@/features/templates/sms-templates/views/sms-templates-view/sms-templates-view")
)
const SmsTemplatesEmptyView = lazy(() => import("@/features/templates/sms-templates/views/sms-templates-empty-view"))
const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const SmsTemplatesRoute = () => {
	const { offset, limit, order, sort, filters, searchTerm, appliedFiltersCount } = useSelector<
		DataGridState<"sms-templates">
	>(({ dataGrid }) => dataGrid["sms-templates"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetSmsTemplatesQuery(
		{
			limit,
			offset,
			sort,
			order,
			name: searchTerm || undefined,
			any: searchTerm ? true : undefined,
			...filters,
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

	if (isEmptyView) return <SmsTemplatesEmptyView />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady) return <SmsTemplatesView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default SmsTemplatesRoute
