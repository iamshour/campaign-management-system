//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { FullViewSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

import { useGetChannelSourceOptOutListQuery } from "../api"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const ChannelSourceOptedOutListView = lazy(
	() => import("../views/channel-source-opted-out-list-view/channel-source-opted-out-list-view")
)
//#endregion

const ChannelSourceOptedOutListRoute = () => {
	const { channelSourceId } = useParams()

	const { channelTypeInUrl } = useGetChannelType()

	const dataViewKey = `${channelTypeInUrl!}-channel-source-opted-out-list` as const

	const { filters, paginationAndSorting, searchTerm } = useSelector(({ dataView }) => dataView[dataViewKey])

	const { count, error, isError, isFetching, isInitialLoading, isReady, list } = useGetChannelSourceOptOutListQuery(
		{
			...filters,
			...paginationAndSorting,
			...getSearchFilter<["recipient"]>(searchTerm, ["recipient"]),
			channelSourceId: channelSourceId!,
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
			skip: !channelSourceId,
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <FullViewSkeleton />

	if (isError) return <DisplayError error={error as any} />

	if (isReady)
		return (
			<ChannelSourceOptedOutListView
				count={count || 0}
				dataViewKey={dataViewKey}
				isFetching={isFetching}
				list={list || []}
			/>
		)
}

export default ChannelSourceOptedOutListRoute
