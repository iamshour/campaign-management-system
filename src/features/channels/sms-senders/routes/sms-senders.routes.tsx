//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
const SmsSendersRoutesLayout = lazy(() => import("../layouts/sms-senders-routes-layout"))

import SmsSenderRoute from "./sms-sender-route"

const ChannelSourcesRoute = lazy(() => import("./channel-sources-route"))
//#endregion

const SmsChannelRoutes = () => (
	<Routes>
		<Route element={<SmsSendersRoutesLayout />}>
			<Route element={<ChannelSourcesRoute />} path='local-sms/senders' />
			<Route element={<ChannelSourcesRoute />} path='international-sms/senders' />
		</Route>

		<Route element={<SmsSenderRoute />} path='local-sms/senders/:channelSourceId' />
		<Route element={<SmsSenderRoute />} path='international-sms/senders/:channelSourceId' />

		<Route element={<Navigate to='local-sms/senders' />} path='*' />
	</Routes>
)

export default SmsChannelRoutes
