//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import { DataTableSkeleton, NavTabs } from "@/ui"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
//#endregion

const SmsSendersManagementLayout = () => {
	const { channelTypeInUrl } = useGetChannelType()

	return (
		<div className='flex h-full w-full flex-col'>
			<NavTabs>
				<NavTabs.Item to={`./${channelTypeInUrl}/senders`}>Business Senders</NavTabs.Item>
				<NavTabs.Item to={`./${channelTypeInUrl}/listing-requests`}>Requests</NavTabs.Item>
			</NavTabs>

			<Suspense fallback={<DataTableSkeleton />}>
				<Outlet />
			</Suspense>
		</div>
	)
}

export default SmsSendersManagementLayout
