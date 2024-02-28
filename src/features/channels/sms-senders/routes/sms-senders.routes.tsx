//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
const SmsSendersRoutesLayout = lazy(() => import("../components/sms-senders-routes-layout"))

const SmsSendersRoute = lazy(() => import("./sms-senders-route"))

//#endregion

const SmsChannelRoutes = () => (
	<Routes>
		<Route element={<SmsSendersRoutesLayout />}>
			<Route element={<SmsSendersRoute />} path='local' />
			<Route element={<SmsSendersRoute />} path='international' />
		</Route>

		<Route element={<Navigate to='local' />} path='*' />
	</Routes>
)

export default SmsChannelRoutes
