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

const AdminChannelSourcesView = lazy(
	() => import("@/features/channels/sms-senders-management/views/admin-channel-sources-view/admin-channel-sources-view")
)

const AdminChannelSourcesViewEmpty = lazy(
	() =>
		import(
			"@/features/channels/sms-senders-management/views/admin-channel-sources-view/admin-channel-sources-view-empty"
		)
)

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const AdminChannelSourcesRoute = () => {
	const { channelType, channelTypeInUrl } = useGetChannelType()

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
				count: data?.count ?? 0,
				isEmptyView: !isFetching && !!isSuccess && !data?.list?.length && !(appliedFiltersCount || searchTerm),
				isFetching,
				isInitialLoading: !data && isLoading,
				isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
				list:
					data?.list?.map((sender) => ({ ...sender, name: sender.channelSourceName, types: sender.templateTypes })) ??
					[],
				...rest,
			}),
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <AdminChannelSourcesViewEmpty />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady)
		return <AdminChannelSourcesView count={count} dataViewKey={dataViewKey} isFetching={isFetching} list={list} />
}

export default AdminChannelSourcesRoute
