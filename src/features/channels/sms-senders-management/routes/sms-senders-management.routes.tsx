//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const AdminSmsListingsRoute = lazy(() => import("./admin-sms-listings-route"))

const CreateSmsSenderRoute = lazy(() => import("./create-sms-sender-route"))

const CreateSmsSenderRequestRoute = lazy(() => import("./create-sms-sender-request-route"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const SmsListingRequestsLayout = lazy(() => import("../layouts/sms-listing-requests-layout"))

const SmsSendersManagementLayout = lazy(() => import("../layouts/sms-senders-management-layout"))

const ChannelSourceRequestsPendingRoute = lazy(() => import("./channel-source-requests-pending-route"))

const ChannelSourceRequestsCompletedRoute = lazy(() => import("./channel-source-requests-completed-route"))

const AdminChannelSourcesRoute = lazy(() => import("./admin-channel-sources-route"))

const SmsOptedOutSendersRoute = lazy(() => import("./sms-opted-out-senders-route"))
//#endregion

const SmsSendersManagementRoutes = () => (
	<Routes>
		<Route element={<SmsSendersManagementLayout />}>
			<Route element={<AdminChannelSourcesRoute />} path='local-sms/senders' />
			<Route element={<AdminChannelSourcesRoute />} path='international-sms/senders' />

			<Route element={<SmsListingRequestsLayout />}>
				<Route element={<ChannelSourceRequestsPendingRoute />} path='local-sms/listing-requests/pending' />
				<Route element={<ChannelSourceRequestsCompletedRoute />} path='local-sms/listing-requests/completed' />

				<Route element={<ChannelSourceRequestsPendingRoute />} path='international-sms/listing-requests/pending' />
				<Route element={<ChannelSourceRequestsCompletedRoute />} path='international-sms/listing-requests/completed' />
			</Route>

			<Route element={<Navigate to='./senders' />} path='local-sms' />
			<Route element={<Navigate to='./senders' />} path='international-sms' />

			<Route element={<Navigate to='./pending' />} path='local-sms/listing-requests' />
			<Route element={<Navigate to='./pending' />} path='international-sms/listing-requests' />
		</Route>

		<Route element={<CreateSmsSenderRequestRoute />} path='local-sms/listing-requests/new-request' />
		<Route element={<CreateSmsSenderRequestRoute />} path='international-sms/listing-requests/new-request' />

		<Route element={<CreateSmsSenderRoute />} path='local-sms/senders/new-sender' />
		<Route element={<CreateSmsSenderRoute />} path='international-sms/senders/new-sender' />

		<Route element={<AdminSmsListingsRoute />} path='local-sms/senders/:senderId' />
		<Route element={<AdminSmsListingsRoute />} path='international-sms/senders/:senderId' />

		<Route element={<SmsOptedOutSendersRoute />} path='local-sms/senders/:senderId/opted-out' />
		<Route element={<SmsOptedOutSendersRoute />} path='international-sms/senders/:senderId/opted-out' />

		<Route element={<DisplayError error={{ status: 404 }} />} path='*' />
	</Routes>
)

export default SmsSendersManagementRoutes
