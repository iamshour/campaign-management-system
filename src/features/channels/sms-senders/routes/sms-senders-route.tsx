//#region Import
import type { DataViewState } from "@/core/components/data-view/types"
import type { SmsSenderDataViewKeyOptions } from "@/features/channels/sms-senders/types"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getChannelType from "@/core/utils/get-channel-type"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetSmsSendersQuery } from "@/features/channels/sms-senders/api"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"
import { useLocation } from "react-router-dom"

const SmsSendersView = lazy(() => import("@/features/channels/sms-senders/views/sms-senders-view/sms-senders-view"))

const SmsSendersEmptyView = lazy(() => import("@/features/channels/sms-senders/views/sms-senders-empty-view"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const SmsSendersRoute = () => {
	const { pathname } = useLocation()

	// channel type: "local" | "international"
	const channelType = getChannelType(pathname)!.type!

	// dataview Key: "local-sms-senders" | "international-sms-senders"
	const dataViewKey: SmsSenderDataViewKeyOptions = `${channelType}-sms-senders`

	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector<
		DataViewState<typeof dataViewKey>
	>(({ dataView }) => dataView[dataViewKey] as DataViewState<typeof dataViewKey>)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } = useGetSmsSendersQuery(
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
				list: data?.list,
				...rest,
			}),
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <SmsSendersEmptyView channelType={channelType} />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady)
		return <SmsSendersView count={count || 0} dataViewKey={dataViewKey} isFetching={isFetching} list={list || []} />
}

export default SmsSendersRoute
