//#region Import
import { Outlet } from "react-router-dom"

import { NavTabs } from "@/ui"
//#endregion

const SmsTemplatesRoutesLayout = () => (
	<div className='flex h-full w-full flex-col'>
		<NavTabs>
			{/* TODO: Use Translated Text  */}
			<NavTabs.Item to='/templates/sms-templates/my-templates'>SMS Templates</NavTabs.Item>
			<NavTabs.Item to='/templates/sms-templates/prebuilt-templates'>Prebuilt Templates</NavTabs.Item>
		</NavTabs>

		<Outlet />
	</div>
)

export default SmsTemplatesRoutesLayout
