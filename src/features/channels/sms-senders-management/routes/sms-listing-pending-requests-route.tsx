//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"

import { useGetSmsListingRequestsQuery } from "../api"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const SmsListingRequestsPendingEmpty = lazy(
	() => import("../views/sms-listing-requests-pending-view/sms-listing-requests-pending-empty")
)

const SmsListingRequestsPendingView = lazy(
	() => import("../views/sms-listing-requests-pending-view/sms-listing-requests-pending-view")
)
//#endregion

const SmsListingPendingRequestsRoute = () => {
	const { type } = useGetChannelType()

	const dataViewKey = `${type!}-sms-listing-pending-requests` as const

	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector(
		({ dataView }) => dataView[dataViewKey]
	)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } =
		useGetSmsListingRequestsQuery(
			{
				...filters,
				...paginationAndSorting,
				status: "PENDING",
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

	if (isEmptyView) return <SmsListingRequestsPendingEmpty />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady)
		return (
			<SmsListingRequestsPendingView
				count={count || 0}
				dataViewKey={dataViewKey}
				isFetching={isFetching}
				list={list || []}
			/>
		)
}

export default SmsListingPendingRequestsRoute
