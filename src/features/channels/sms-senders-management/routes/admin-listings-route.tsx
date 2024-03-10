//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetChannelSourceListingsQuery } from "@/features/channels/common/api"
import { FullViewSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const AdminSmsListingsView = lazy(() => import("../views/admin-listings-view/admin-listings-view"))
//#endregion

const AdminListingsRoute = () => {
	const { channelSourceId } = useParams()

	const { channelTypeInUrl } = useGetChannelType()

	const dataViewKey = `${channelTypeInUrl!}-channel-source-listings` as const

	const { filters, paginationAndSorting } = useSelector(({ dataView }) => dataView[dataViewKey])

	const { count, error, isError, isFetching, isInitialLoading, isReady, list } = useGetChannelSourceListingsQuery(
		{
			...filters,
			...paginationAndSorting,
			channelSourceId: channelSourceId!,
			// SHOULD BE PASSED. BUT DOES NOT EXIST AT THE MOMENT
			// channelType,
			// send search filter here as well
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
			<AdminSmsListingsView count={count || 0} dataViewKey={dataViewKey} isFetching={isFetching} list={list || []} />
		)
}

export default AdminListingsRoute
