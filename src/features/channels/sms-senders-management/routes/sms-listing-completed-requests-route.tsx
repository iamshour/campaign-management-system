//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"

import { useGetChannelSourceRequestsQuery } from "../api"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const SmsListingRequestsCompletedEmpty = lazy(
	() => import("../views/sms-listing-requests-completed-view/sms-listing-requests-completed-empty")
)

const SmsListingRequestsCompletedView = lazy(
	() => import("../views/sms-listing-requests-completed-view/sms-listing-requests-completed-view")
)
//#endregion

const SmsListingCompletedRequestsRoute = () => {
	const { channelType, channelTypeInUrl } = useGetChannelType()

	const dataViewKey = `${channelTypeInUrl!}-channel-source-requests-completed` as const

	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector(
		({ dataView }) => dataView[dataViewKey]
	)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } =
		useGetChannelSourceRequestsQuery(
			{
				...filters,
				...paginationAndSorting,
				...getSearchFilter<["channelSourceName", "companyName"]>(searchTerm, ["channelSourceName", "companyName"]),
				channelSourceRequestStatus: "COMPLETED",
				channelType,
			},
			{
				selectFromResult: ({ data, isFetching, isLoading, isSuccess, ...rest }) => ({
					count: data?.count,
					isEmptyView: !isFetching && !!isSuccess && !data?.count && !(appliedFiltersCount || !!searchTerm?.length),
					isFetching,
					isInitialLoading: data === undefined && isLoading,
					isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
					list: data?.list,
					...rest,
				}),
				...baseQueryConfigs,
			}
		)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <SmsListingRequestsCompletedEmpty />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady)
		return (
			<SmsListingRequestsCompletedView
				count={count || 0}
				dataViewKey={dataViewKey}
				isFetching={isFetching}
				list={list || []}
			/>
		)
}

export default SmsListingCompletedRequestsRoute
