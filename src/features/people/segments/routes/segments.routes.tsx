//#region Import
import { Suspense, lazy } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"

import SegmentFunnelSkeleton from "../components/segment-funnel-skeleton"

const SegmentsRoute = lazy(() => import("@/features/people/segments/routes/segments-route/segments-route"))
const SegmentRoute = lazy(() => import("@/features/people/segments/routes/segment-route/segment-route"))
const EditSegmentRoute = lazy(() => import("@/features/people/segments/routes/edit-segment-route/edit-segment-route"))
const NewSegmentRoute = lazy(() => import("@/features/people/segments/views/editable-segment-view"))
//#endregion

const SegmentsRoutes = () => (
	<Routes>
		<Route path='' element={<SegmentsRoute />} />

		<Route element={<SuspenseWrapper />}>
			<Route path='new-segment' element={<NewSegmentRoute view='createSegment' />} />
			<Route path=':id' element={<SegmentRoute />} />
			<Route path=':id/edit-segment' element={<EditSegmentRoute />} />
		</Route>

		<Route path='*' element={<Navigate to='.' />} />
	</Routes>
)

export default SegmentsRoutes

const SuspenseWrapper = () => (
	<Suspense fallback={<SegmentFunnelSkeleton />}>
		<Outlet />
	</Suspense>
)
