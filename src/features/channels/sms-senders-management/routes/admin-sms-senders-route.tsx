//#region Import
import type { DataViewState } from "@/core/components/data-view/types"
import type { SmsSenderDataViewKeyOptions } from "@/features/channels/sms-senders/types"

import useGetChannelType from "@/core/hooks/useGetChannelType"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetSmsSendersQuery } from "@/features/channels/sms-senders/api"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"

const AdminSmsSendersView = lazy(
	() => import("@/features/channels/sms-senders-management/views/admin-sms-senders-view/admin-sms-senders-view")
)

const AdminSmsSendersViewEmpty = lazy(
	() => import("@/features/channels/sms-senders-management/views/admin-sms-senders-view/admin-sms-senders-view-empty")
)

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const AdminSmsSendersRoute = () => {
	const { type } = useGetChannelType()

	const dataViewKey: SmsSenderDataViewKeyOptions = `${type!}-sms-senders`

	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector<
		DataViewState<typeof dataViewKey>
	>(({ dataView }) => dataView[dataViewKey] as DataViewState<typeof dataViewKey>)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } = useGetSmsSendersQuery(
		{
			...paginationAndSorting,
			...filters,
			...getSearchFilter<["name"]>(searchTerm, ["name"]),
			channelType: type,
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

	if (isEmptyView) return <AdminSmsSendersViewEmpty />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady)
		return (
			<AdminSmsSendersView count={count || 0} dataViewKey={dataViewKey} isFetching={isFetching} list={list || []} />
		)
}

export default AdminSmsSendersRoute
