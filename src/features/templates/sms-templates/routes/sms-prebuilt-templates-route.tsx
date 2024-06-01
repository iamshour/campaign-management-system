//#region Import
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetSmsIndustryTemplatesQuery } from "@/features/industries/api"
import { DataGridSkeleton } from "@/ui"
import { omit } from "@/utils"
import { lazy } from "react"

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

	const { filters, paginationAndSorting, searchTerm } = useSelector(
		({ dataView }) => dataView[prebuiltTemplatesGridKey]
	)

	/**
	 * Industry Id used to fetch prebuilt Templates
	 */
	const industryId = !filters?.industryId
		? defaultUserIndustryId
		: filters?.industryId !== "ALL"
			? filters?.industryId
			: undefined

	const { count, error, isError, isFetching, isInitialLoading, isReady, list } = useGetSmsIndustryTemplatesQuery(
		{
			...omit(filters, ["filterBy", "industryId"]),
			...paginationAndSorting,
			...getSearchFilter<["name"]>(searchTerm, ["name"]),
			industryId,
			mostPopular: Boolean(filters?.filterBy === "POPULAR") || undefined,
			order: filters?.filterBy === "RECENT" ? "desc" : undefined,
			sort: filters?.filterBy === "RECENT" ? "createdAt" : undefined,
			// Business users can only see published prebuilt templates
			statuses: ["PUBLISHED"],
		},
		{
			selectFromResult: ({ data, isFetching, isLoading, ...rest }) => ({
				count: data?.count,
				isFetching,
				isInitialLoading: !data && isLoading,
				isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
				list: data?.list,
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
				count={count || 0}
				isFetching={isFetching}
				list={list || []}
				prebuiltTemplatesGridKey={prebuiltTemplatesGridKey}
			/>
		)
}

export default SmsPrebuiltTemplatesRoute
