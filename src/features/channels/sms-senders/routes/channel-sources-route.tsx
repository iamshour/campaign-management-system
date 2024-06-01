//#region Import
import type { DataViewState } from "@/core/components/data-view/types"
import type { SmsChannelSourceDataViewKey } from "@/features/channels/sms-senders/types/data.types"

import useGetChannelType from "@/core/hooks/useGetChannelType"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetChannelSourcesQuery } from "@/features/channels/common/api"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"

const ChannelSourcesView = lazy(
	() => import("@/features/channels/sms-senders/views/channel-sources-view/channel-sources-view")
)

const ChannelSourcesViewEmpty = lazy(
	() => import("@/features/channels/sms-senders/views/channel-sources-view/channel-sources-view-empty")
)

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const ChannelSourcesRoute = () => {
	const { channelType, channelTypeInUrl } = useGetChannelType()

	// dataview Key: "local-sms-channel-sources" | "international-sms-channel-sources"
	const dataViewKey: SmsChannelSourceDataViewKey = `${channelTypeInUrl!}-channel-sources`

	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector<
		DataViewState<typeof dataViewKey>
	>(({ dataView }) => dataView[dataViewKey] as DataViewState<typeof dataViewKey>)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } = useGetChannelSourcesQuery(
		{
			...paginationAndSorting,
			...filters,
			...getSearchFilter<["name"]>(searchTerm, ["name"]),
			channelType,
		},
		{
			selectFromResult: ({ data, isFetching, isLoading, isSuccess, ...rest }) => ({
				count: data?.count,
				isEmptyView: !isFetching && !!isSuccess && !data?.list?.length && !(appliedFiltersCount || searchTerm),
				isFetching,
				isInitialLoading: !data && isLoading,
				isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
				list: data?.list?.map((sender) => ({ ...sender, name: sender.channelSourceName, types: sender.templateTypes })),
				...rest,
			}),
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <ChannelSourcesViewEmpty />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady)
		return <ChannelSourcesView count={count || 0} dataViewKey={dataViewKey} isFetching={isFetching} list={list || []} />
}

export default ChannelSourcesRoute
