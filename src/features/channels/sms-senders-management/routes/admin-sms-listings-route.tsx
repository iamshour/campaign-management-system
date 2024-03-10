//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsListingsQuery } from "@/features/channels/common/api"
import { FullViewSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const AdminSmsListingsView = lazy(() => import("../views/admin-sms-listings-view/admin-sms-listings-view"))
//#endregion

const AdminSmsListingsRoute = () => {
	const { senderId } = useParams()

	const { channelType, channelTypeInUrl } = useGetChannelType()

	const dataViewKey = `${channelTypeInUrl!}-listings` as const

	const { filters, paginationAndSorting } = useSelector(({ dataView }) => dataView[dataViewKey])

	const { count, error, isError, isFetching, isInitialLoading, isReady, list } = useGetSmsListingsQuery(
		{
			channelType,
			sourceId: senderId!,
			...filters,
			...paginationAndSorting,
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
			skip: !senderId,
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

export default AdminSmsListingsRoute
