//#region Import
import type { DataViewState } from "@/core/components/data-view/types"
import type { SmsSenderDataViewKeyOptions } from "@/features/channels/sms-senders/types"

import useGetChannelType from "@/core/hooks/useGetChannelType"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetSmsSendersQuery } from "@/features/channels/common/api"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"

const SmsSendersView = lazy(() => import("@/features/channels/sms-senders/views/sms-senders-view/sms-senders-view"))

const SmsSendersViewEmpty = lazy(
	() => import("@/features/channels/sms-senders/views/sms-senders-view/sms-senders-view-empty")
)

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const SmsSendersRoute = () => {
	const { channelType, channelTypeInUrl } = useGetChannelType()

	// dataview Key: "local-sms-senders" | "international-sms-senders"
	const dataViewKey: SmsSenderDataViewKeyOptions = `${channelTypeInUrl!}-senders`

	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector<
		DataViewState<typeof dataViewKey>
	>(({ dataView }) => dataView[dataViewKey] as DataViewState<typeof dataViewKey>)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } = useGetSmsSendersQuery(
		{
			channelType,
			...paginationAndSorting,
			...filters,
			...getSearchFilter<["name"]>(searchTerm, ["name"]),
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

	if (isEmptyView) return <SmsSendersViewEmpty />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady)
		return <SmsSendersView count={count || 0} dataViewKey={dataViewKey} isFetching={isFetching} list={list || []} />
}

export default SmsSendersRoute
