//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
const SmsSendersRoutesLayout = lazy(() => import("../layouts/sms-senders-routes-layout"))

import SmsSenderRoute from "./sms-sender-route"

const SmsSendersRoute = lazy(() => import("./sms-senders-route"))

//#endregion

const SmsChannelRoutes = () => (
	<Routes>
		<Route element={<SmsSendersRoutesLayout />}>
			<Route element={<SmsSendersRoute />} path='local-sms/senders' />
			<Route element={<SmsSendersRoute />} path='international-sms/senders' />
		</Route>

		<Route element={<SmsSenderRoute />} path='local-sms/senders/:senderId' />
		<Route element={<SmsSenderRoute />} path='international-sms/senders/:senderId' />

		<Route element={<Navigate to='local-sms/senders' />} path='*' />
	</Routes>
)

export default SmsChannelRoutes
