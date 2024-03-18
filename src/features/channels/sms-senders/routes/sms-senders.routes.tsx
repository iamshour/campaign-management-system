//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import SmsSendersRoutesLayout from "../layouts/sms-senders-routes-layout"

const ChannelSourceRoute = lazy(() => import("./channel-source-route"))

const ChannelSourcesRoute = lazy(() => import("./channel-sources-route"))
//#endregion

const SmsChannelRoutes = () => (
	<Routes>
		<Route element={<SmsSendersRoutesLayout />}>
			<Route element={<ChannelSourcesRoute />} path='local-sms/senders' />
			<Route element={<ChannelSourcesRoute />} path='international-sms/senders' />
		</Route>

		<Route element={<ChannelSourceRoute />} path='local-sms/senders/:channelSourceId' />
		<Route element={<ChannelSourceRoute />} path='international-sms/senders/:channelSourceId' />

		<Route element={<Navigate to='local-sms/senders' />} path='*' />
	</Routes>
)

export default SmsChannelRoutes
