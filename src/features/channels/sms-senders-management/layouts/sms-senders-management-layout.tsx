//#region Import
import getChannelType from "@/core/utils/get-channel-type"
import { NavTabs } from "@/ui"
import { Outlet, useLocation } from "react-router-dom"
//#endregion

const SmsSendersManagementLayout = () => {
	const { pathname } = useLocation()

	const channel = getChannelType(pathname)

	if (!channel?.name) return

	return (
		<div className='flex h-full w-full flex-col'>
			<NavTabs>
				<NavTabs.Item to={`./${channel.type}-${channel.name}/business-senders`}>Business Sender Ids</NavTabs.Item>
				<NavTabs.Item to={`./${channel.type}-${channel.name}/listing-requests`}>Requests IDs</NavTabs.Item>
			</NavTabs>

			<Outlet />
		</div>
	)
}

export default SmsSendersManagementLayout
