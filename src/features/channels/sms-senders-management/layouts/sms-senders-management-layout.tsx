//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import { NavTabs } from "@/ui"
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

			<Outlet />
		</div>
	)
}

export default SmsSendersManagementLayout
