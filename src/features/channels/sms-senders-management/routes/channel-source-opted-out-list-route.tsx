//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

import { useGetChannelSourceOptOutListQuery } from "../api"
import ChannelSourceOptOutListViewEmpty from "../views/channel-source-opt-out-list-view/channel-source-opt-out-list-view-empty"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const ChannelSourceOptOutListView = lazy(
	() => import("../views/channel-source-opt-out-list-view/channel-source-opt-out-list-view")
)
//#endregion

const ChannelSourceOptedOutListRoute = () => {
	const { channelSourceId } = useParams()

	const { channelTypeInUrl } = useGetChannelType()

	const dataViewKey = `${channelTypeInUrl!}-channel-source-opted-out-list` as const

	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector(
		({ dataView }) => dataView[dataViewKey]
	)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } =
		useGetChannelSourceOptOutListQuery(
			{
				...filters,
				...paginationAndSorting,
				...getSearchFilter<["recipient"]>(searchTerm, ["recipient"]),
				channelSourceId: channelSourceId!,
			},
			{
				selectFromResult: ({ data, isFetching, isLoading, isSuccess, ...rest }) => ({
					count: data?.count,
					isEmptyView: !isFetching && !!isSuccess && !data?.count && !(appliedFiltersCount || !!searchTerm?.length),
					isFetching,
					isInitialLoading: !data && isLoading,
					isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
					list: data?.list,
					...rest,
				}),
				skip: !channelSourceId,
				...baseQueryConfigs,
			}
		)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <ChannelSourceOptOutListViewEmpty />

	if (isError) return <DisplayError error={error as any} />

	if (isReady)
		return (
			<ChannelSourceOptOutListView
				count={count || 0}
				dataViewKey={dataViewKey}
				isFetching={isFetching}
				list={list || []}
			/>
		)
}

export default ChannelSourceOptedOutListRoute
