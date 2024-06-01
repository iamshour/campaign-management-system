//#region Import
import { lazy, Suspense } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"

import SegmentFunnelSkeleton from "../components/segment-funnel-skeleton"

const SegmentsRoute = lazy(() => import("@/features/people/segments/routes/segments-route"))

const SegmentRoute = lazy(() => import("@/features/people/segments/routes/segment-route"))

const EditSegmentRoute = lazy(() => import("@/features/people/segments/routes/edit-segment-route"))

const NewSegmentRoute = lazy(() => import("@/features/people/segments/views/editable-segment-view"))
//#endregion

const SegmentsRoutes = () => (
	<Routes>
		<Route element={<SegmentsRoute />} path='' />

		<Route element={<SuspenseWrapper />}>
			<Route element={<NewSegmentRoute view='createSegment' />} path='new-segment' />
			<Route element={<SegmentRoute />} path=':id' />
			<Route element={<EditSegmentRoute />} path=':id/edit-segment' />
		</Route>

		<Route element={<Navigate to='.' />} path='*' />
	</Routes>
)

export default SegmentsRoutes

const SuspenseWrapper = () => (
	<Suspense fallback={<SegmentFunnelSkeleton />}>
		<Outlet />
	</Suspense>
)
