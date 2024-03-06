//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const AdminSmsListingsRoute = lazy(() => import("./admin-sms-listings-route"))

const CreateSmsSenderRoute = lazy(() => import("./create-sms-sender-route"))

const CreateSmsSenderRequestRoute = lazy(() => import("./create-sms-sender-request-route"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const SmsListingRequestsLayout = lazy(() => import("../layouts/sms-listing-requests-layout"))

const SmsSendersManagementLayout = lazy(() => import("../layouts/sms-senders-management-layout"))

const SmsListingPendingRequestsRoute = lazy(() => import("./sms-listing-pending-requests-route"))

const SmsListingCompletedRequestsRoute = lazy(() => import("./sms-listing-completed-requests-route"))

const AdminSmsSendersRoute = lazy(() => import("./admin-sms-senders-route"))
//#endregion

const SmsSendersManagementRoutes = () => (
	<Routes>
		<Route element={<SmsSendersManagementLayout />}>
			<Route element={<AdminSmsSendersRoute />} path='local-sms/senders' />
			<Route element={<AdminSmsSendersRoute />} path='international-sms/senders' />

			<Route element={<SmsListingRequestsLayout />}>
				<Route element={<SmsListingPendingRequestsRoute />} path='local-sms/listing-requests/pending' />
				<Route element={<SmsListingCompletedRequestsRoute />} path='local-sms/listing-requests/completed' />

				<Route element={<SmsListingPendingRequestsRoute />} path='international-sms/listing-requests/pending' />
				<Route element={<SmsListingCompletedRequestsRoute />} path='international-sms/listing-requests/completed' />
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

		<Route element={<DisplayError error={{ status: 404 }} />} path='*' />
	</Routes>
)

export default SmsSendersManagementRoutes
