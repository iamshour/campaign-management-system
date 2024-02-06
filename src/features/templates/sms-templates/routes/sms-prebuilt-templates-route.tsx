//#region Import
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import PrebuiltSmsTemplatesView from "@/features/templates/sms-templates/views/sms-prebuilt-templates-view/sms-prebuilt-templates-view"
import { DataGridSkeleton, DisplayError } from "@/ui"

import { useGetSmsPrebuiltTemplatesByIndustryIdQuery } from "../api"
//#endregion

const PrebuiltSmsTemplatesRoute = () => {
	// TODO: Mock Industry Id, From User's Account (Get from User Token OR User info in authSlice)
	const userDeafultIndustryId = "Rental Services"

	const { offset, limit, filters, searchTerm } = useSelector<AdvancedTableStateType<"sms-prebuilt-templates">>(
		({ advancedTable }) => advancedTable["sms-prebuilt-templates"]
	)

	const { list, count, isInitialLoading, isFetching, isError, error } = useGetSmsPrebuiltTemplatesByIndustryIdQuery(
		{
			industryId: filters?.industryId || userDeafultIndustryId,
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

	return <PrebuiltSmsTemplatesView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default PrebuiltSmsTemplatesRoute
