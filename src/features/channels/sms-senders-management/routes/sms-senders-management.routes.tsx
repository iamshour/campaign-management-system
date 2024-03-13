//#region Import
import { FullViewSkeleton } from "@/ui"
import { lazy, Suspense } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"

import SmsListingRequestsLayout from "../layouts/sms-listing-requests-layout"
import SmsSendersManagementLayout from "../layouts/sms-senders-management-layout"

const AdminListingsRoute = lazy(() => import("./admin-listings-route"))

const CreateSmsSenderRoute = lazy(() => import("./create-sms-sender-route"))

const CreateChannelSourceRequestRoute = lazy(() => import("./create-channel-source-request-route"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const ChannelSourceRequestsPendingRoute = lazy(() => import("./channel-source-requests-pending-route"))

const ChannelSourceRequestsCompletedRoute = lazy(() => import("./channel-source-requests-completed-route"))

const AdminChannelSourcesRoute = lazy(() => import("./admin-channel-sources-route"))

const ChannelSourceOptedOutListRoute = lazy(() => import("./channel-source-opted-out-list-route"))
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

		<Route element={<FullViewSuspense />}>
			<Route element={<CreateChannelSourceRequestRoute />} path='local-sms/listing-requests/new-request' />
			<Route element={<CreateChannelSourceRequestRoute />} path='international-sms/listing-requests/new-request' />

			<Route element={<CreateSmsSenderRoute />} path='local-sms/senders/new-sender' />
			<Route element={<CreateSmsSenderRoute />} path='international-sms/senders/new-sender' />
		</Route>

		<Route element={<AdminListingsRoute />} path='local-sms/senders/:channelSourceId' />
		<Route element={<AdminListingsRoute />} path='international-sms/senders/:channelSourceId' />

		<Route element={<ChannelSourceOptedOutListRoute />} path='local-sms/senders/:channelSourceId/opted-out' />
		<Route element={<ChannelSourceOptedOutListRoute />} path='international-sms/senders/:channelSourceId/opted-out' />

		<Route element={<DisplayError error={{ status: 404 }} />} path='*' />
	</Routes>
)

export default SmsSendersManagementRoutes

const FullViewSuspense = () => (
	<Suspense fallback={<FullViewSkeleton />}>
		<Outlet />
	</Suspense>
)
