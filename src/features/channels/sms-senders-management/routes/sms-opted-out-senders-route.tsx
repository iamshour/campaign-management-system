//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { FullViewSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

import { useGetSmsOptedOutSendersQuery } from "../api"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const SmsOptedOutSendersView = lazy(() => import("../views/sms-opted-out-senders-view/sms-opted-out-senders-view"))
//#endregion

const SmsOptedOutSendersRoute = () => {
	const { senderId } = useParams()

	const { channelTypeInUrl } = useGetChannelType()

	const dataViewKey = `${channelTypeInUrl!}-opted-out-senders` as const

	const { filters, paginationAndSorting } = useSelector(({ dataView }) => dataView[dataViewKey])

	const { count, error, isError, isFetching, isInitialLoading, isReady, list } = useGetSmsOptedOutSendersQuery(
		{
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
			<SmsOptedOutSendersView count={count || 0} dataViewKey={dataViewKey} isFetching={isFetching} list={list || []} />
		)
}

export default SmsOptedOutSendersRoute
