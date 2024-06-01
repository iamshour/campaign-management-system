//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetChannelSourceListingsQuery } from "@/features/channels/common/api"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const AdminSmsListingsView = lazy(() => import("../views/admin-listings-view/admin-listings-view"))
//#endregion

const AdminListingsRoute = () => {
	const { channelSourceId } = useParams()

	const { channelTypeInUrl } = useGetChannelType()

	const dataViewKey = `${channelTypeInUrl!}-channel-source-listings` as const

	const { filters, paginationAndSorting, searchTerm } = useSelector(({ dataView }) => dataView[dataViewKey])

	const { count, error, isError, isFetching, isInitialLoading, isReady, list } = useGetChannelSourceListingsQuery(
		{
			...filters,
			...paginationAndSorting,
			channelSourceId: channelSourceId!,
			...getSearchFilter<["companyName"]>(searchTerm, ["companyName"]),
			// SHOULD BE PASSED. BUT DOES NOT EXIST AT THE MOMENT
			// channelType,
			// send search filter here as well
		},
		{
			selectFromResult: ({ data, isFetching, isLoading, ...rest }) => ({
				count: data?.channelSourceListings?.count,
				isFetching,
				isInitialLoading: !data && isLoading,
				isReady:
					!isLoading &&
					data?.channelSourceListings?.list !== undefined &&
					data?.channelSourceListings?.count !== undefined,
				list: data?.channelSourceListings?.list,
				...rest,
			}),
			skip: !channelSourceId,
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isError) return <DisplayError error={error as any} />

	if (isReady)
		return (
			<AdminSmsListingsView count={count || 0} dataViewKey={dataViewKey} isFetching={isFetching} list={list || []} />
		)
}

export default AdminListingsRoute
