//#region Import
import { Navigate, Route, Routes } from "react-router-dom"

import SmsTemplatesLayout from "../components/sms-templates-layout"
//#endregion

const SmsTemplatesFeatureRoutes = () => (
	<Routes>
		<Route element={<SmsTemplatesLayout />}>
			<Route path='my-templates' element={<div className='flex-1 p-4'>Sms</div>} />
			<Route path='prebuilt-templates' element={<div className='flex-1 p-4'>pre-built</div>} />
		</Route>

		<Route path='*' element={<Navigate to='my-templates' />} />
	</Routes>
)

export default SmsTemplatesFeatureRoutes
