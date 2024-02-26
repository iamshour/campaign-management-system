//#region Import
import { NavTabs } from "@/ui"
import { Outlet } from "react-router-dom"
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
