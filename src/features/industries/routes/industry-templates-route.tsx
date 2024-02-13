//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import { useGetSmsPrebuiltTemplatesQuery } from "@/features/templates/sms-templates/api"
import { DataTableSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const SmsTemplatesEmptyView = lazy(() => import("@/features/templates/sms-templates/views/sms-templates-empty-view"))
const IndustryTemplatesView = lazy(() => import("../views/industry-templates-view/industry-templates-view"))
//#endregion

const IndustryPrebuiltTemplatesRoute = () => {
	const { id: industryId } = useParams()

	const { offset, limit, filters, appliedFiltersCount, searchTerm } = useSelector<
		AdvancedTableStateType<"sms-prebuilt-templates">
	>(({ advancedTable }) => advancedTable["sms-prebuilt-templates"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } =
		useGetSmsPrebuiltTemplatesQuery(
			{
				industryId,
				limit,
				offset,
				sort: !!filters?.filterBy && filters?.filterBy === "RECENT" ? "createdAt" : undefined,
				order: !!filters?.filterBy && filters?.filterBy === "RECENT" ? "desc" : undefined,
				name: searchTerm,
				any: searchTerm ? true : undefined,
				type: filters?.templateType,
				language: filters?.templateLanguage,
			},
			{
				selectFromResult: ({ data, isLoading, isFetching, isSuccess, ...rest }) => ({
					list: data?.list?.slice(offset, limit),
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

	if (isReady) return <IndustryTemplatesView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default IndustryPrebuiltTemplatesRoute
