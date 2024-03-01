//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const CreateSmsSenderRequestRoute = lazy(() => import("./create-sms-sender-request-route"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const SmsListingRequestsLayout = lazy(() => import("../layouts/sms-listing-requests-layout"))

const SmsSendersManagementLayout = lazy(() => import("../layouts/sms-senders-management-layout"))

const SmsListingRequestsRoute = lazy(() => import("./sms-listing-requests-route"))

const SmsBusinessSendersRoute = lazy(() => import("./sms-business-senders-route"))
//#endregion

const SmsSendersManagementRoutes = () => (
	<Routes>
		<Route element={<SmsSendersManagementLayout />}>
			<Route element={<SmsBusinessSendersRoute />} path='local-sms/business-senders' />
			<Route element={<SmsBusinessSendersRoute />} path='international-sms/business-senders' />

			<Route element={<SmsListingRequestsLayout />}>
				<Route element={<SmsListingRequestsRoute />} path='local-sms/listing-requests' />
				<Route element={<SmsListingRequestsRoute />} path='international-sms/listing-requests' />
			</Route>

			<Route element={<Navigate to='./business-senders' />} path='local-sms' />
			<Route element={<Navigate to='./business-senders' />} path='international-sms' />
		</Route>

		<Route element={<CreateSmsSenderRequestRoute />} path='local-sms/listing-requests/new-sender-request' />
		<Route element={<CreateSmsSenderRequestRoute />} path='international-sms/listing-requests/new-sender-request' />

		<Route element={<DisplayError error={{ status: 404 }} />} path='*' />
	</Routes>
)

export default SmsSendersManagementRoutes
