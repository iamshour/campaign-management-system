//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import { useGetSmsIndustryTemplatesQuery } from "@/features/industries/api"
import { DataGridSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const SmsPrebuiltTemplatesView = lazy(
	() => import("@/features/templates/sms-templates/views/sms-prebuilt-templates-view/sms-prebuilt-templates-view")
)
//#endregion

const SmsPrebuiltTemplatesRoute = () => {
	// Getting Default User's Industry from User info in authSlice (Token))
	const defaultUserIndustryId = useSelector(({ auth }) => auth?.user?.industryId)

	const { offset, limit, filters, searchTerm } = useSelector<AdvancedTableStateType<"sms-prebuilt-templates">>(
		({ advancedTable }) => advancedTable["sms-prebuilt-templates"]
	)

	/**
	 * Industry Id used to fetch prebuilt Templates
	 */
	const industryId = !filters?.industryId
		? defaultUserIndustryId
		: filters?.industryId !== "ALL"
			? filters?.industryId
			: undefined

	const { list, count, isInitialLoading, isReady, isFetching, isError, error } = useGetSmsIndustryTemplatesQuery(
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
			mostPopular: Boolean(!!filters?.filterBy && filters?.filterBy === "POPULAR") ?? undefined,
		},
		{
			selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
				list: data?.list?.filter((template) => template?.status !== "DRAFT"),
				count: data?.count,
				isInitialLoading: !data && isLoading,
				isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
				isFetching,
				...rest,
			}),
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataGridSkeleton className='px-8' />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady) return <SmsPrebuiltTemplatesView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default SmsPrebuiltTemplatesRoute
