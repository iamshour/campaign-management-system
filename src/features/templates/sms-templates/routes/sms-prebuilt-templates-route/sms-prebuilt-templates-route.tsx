//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import { useGetSmsIndustryTemplatesQuery } from "@/features/industries/api"
import { DataGridSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const SmsPrebuiltTemplatesView = lazy(
	() => import("@/features/templates/sms-templates/views/sms-prebuilt-templates-view/sms-prebuilt-templates-view")
)
//#endregion

interface SmsPrebuiltTemplatesRouteProps
	extends Pick<React.ComponentPropsWithoutRef<typeof SmsPrebuiltTemplatesView>, "prebuiltTemplatesGridKey"> {}

const SmsPrebuiltTemplatesRoute = ({ prebuiltTemplatesGridKey }: SmsPrebuiltTemplatesRouteProps) => {
	// Getting Default User's Industry from User info in authSlice (Token))
	const defaultUserIndustryId = useSelector(({ auth }) => auth?.user?.industryId)

	const { offset, limit, filters, searchTerm } = useSelector<DataGridState<typeof prebuiltTemplatesGridKey>>(
		({ dataGrid }) => dataGrid[prebuiltTemplatesGridKey]
	)

	/**
	 * Industry Id used to fetch prebuilt Templates
	 */

	//TODO: CHECK industryId === 'ALL'
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
			sort: filters?.filterBy === "RECENT" ? "createdAt" : undefined,
			order: filters?.filterBy === "RECENT" ? "desc" : undefined,
			name: searchTerm,
			any: Boolean(searchTerm?.length) || undefined,
			types: filters?.types,
			languages: filters?.languages,
			// Business users can only see published prebuilt templates
			statuses: ["PUBLISHED"],
			startDate: filters?.startDate,
			endDate: filters?.endDate,
			mostPopular: Boolean(filters?.filterBy === "POPULAR") || undefined,
		},
		{
			selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
				list: data?.list,
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

	if (isReady)
		return (
			<SmsPrebuiltTemplatesView
				prebuiltTemplatesGridKey={prebuiltTemplatesGridKey}
				list={list || []}
				count={count || 0}
				isFetching={isFetching}
			/>
		)
}

export default SmsPrebuiltTemplatesRoute
