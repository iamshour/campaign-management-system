//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import { useGetSmsPrebuiltTemplatesQuery } from "@/features/templates/sms-templates/api"
import { DataGridSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui").then(({ DisplayError }) => ({ default: DisplayError })))
const SmsPrebuiltTemplatesViewContent = lazy(
	() => import("./sms-prebuilt-templates-grid-view-content/sms-prebuilt-templates-view-content")
)
//#endregion

const SmsPrebuiltTemplatesView = ({
	headerChildren,
}: Pick<React.ComponentPropsWithoutRef<typeof SmsPrebuiltTemplatesViewContent>, "headerChildren">) => {
	// Getting Default User's Industry from User info in authSlice (Token))
	const defaultUserIndustryId = useSelector(({ auth }) => auth?.user?.industryId)

	const { offset, limit, filters, searchTerm } = useSelector<AdvancedTableStateType<"sms-prebuilt-templates">>(
		({ advancedTable }) => advancedTable["sms-prebuilt-templates"]
	)

	const { list, count, isInitialLoading, isFetching, isError, error } = useGetSmsPrebuiltTemplatesQuery(
		{
			industryId: !filters?.industryId
				? defaultUserIndustryId
				: filters?.industryId !== "ALL"
					? filters?.industryId
					: undefined,
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
				list: data?.list?.slice(offset, limit),
				count: data?.count,
				isInitialLoading: !data && isLoading,
				isFetching,
				...rest,
			}),
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataGridSkeleton className='px-8' />

	if (isError) return <DisplayError error={error as any} />

	return (
		<SmsPrebuiltTemplatesViewContent
			list={list || []}
			count={count || 0}
			isFetching={isFetching}
			headerChildren={headerChildren}
		/>
	)
}

export default SmsPrebuiltTemplatesView
