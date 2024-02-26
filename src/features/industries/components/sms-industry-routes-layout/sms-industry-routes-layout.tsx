//#region Import
import { NavTabs } from "@/ui"
import { Outlet } from "react-router-dom"
//#endregion

const SmsIndustryRoutesLayout = () => (
	<div className='flex h-full w-full flex-col'>
		<NavTabs>
			<NavTabs.Item to='.'>SMS</NavTabs.Item>
		</NavTabs>

		<Outlet />
	</div>
)

export default SmsIndustryRoutesLayout
