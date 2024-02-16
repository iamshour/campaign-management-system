import { Outlet } from "react-router-dom"

import { NavTabs } from "@/ui"

const SmsIndustryRoutesLayout = () => (
	<div className='flex h-full w-full flex-col'>
		<NavTabs>
			<NavTabs.Item to='.'>SMS</NavTabs.Item>
		</NavTabs>

		<Outlet />
	</div>
)

export default SmsIndustryRoutesLayout
