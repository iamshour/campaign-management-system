//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"

import { useGetChannelSourceRequestsQuery } from "../api"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const ChannelSourceRequestsPendingEmpty = lazy(
	() => import("../views/channel-source-requests-pending-view/channel-source-requests-pending-empty")
)

const ChannelSourceRequestsPendingView = lazy(
	() => import("../views/channel-source-requests-pending-view/channel-source-requests-pending-view")
)
//#endregion

const ChannelSourceRequestsPendingRoute = () => {
	const { channelType, channelTypeInUrl } = useGetChannelType()

	const dataViewKey = `${channelTypeInUrl!}-channel-source-requests-pending` as const

	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector(
		({ dataView }) => dataView[dataViewKey]
	)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } =
		useGetChannelSourceRequestsQuery(
			{
				...filters,
				...paginationAndSorting,
				...getSearchFilter<["channelSourceName", "companyName"]>(searchTerm, ["channelSourceName", "companyName"]),
				channelSourceRequestStatus: "PENDING",
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

	if (isEmptyView) return <ChannelSourceRequestsPendingEmpty />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady)
		return (
			<ChannelSourceRequestsPendingView
				count={count || 0}
				dataViewKey={dataViewKey}
				isFetching={isFetching}
				list={list || []}
			/>
		)
}

export default ChannelSourceRequestsPendingRoute
