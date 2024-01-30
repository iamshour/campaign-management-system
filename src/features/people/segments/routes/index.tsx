//#region Import
import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { DataTableSkeleton } from "@blueai/ui"

import SegmentFunnelSkeleton from "../components/segment-funnel-skeleton"
import SegmentViewSkeleton from "../views/segment-view/segment-view-skeleton"

const SegmentsRoute = lazy(() => import("@/features/people/segments/routes/segments-route"))
const SegmentRoute = lazy(() => import("@/features/people/segments/routes/segment-route"))
const EditSegmentRoute = lazy(() => import("@/features/people/segments/routes/edit-segment-route"))
const NewSegmentRoute = lazy(() => import("@/features/people/segments/views/editable-segment-view"))
//#endregion

const SegmentsFeatureRoutes = () => (
	<Routes>
		<Route
			path=''
			element={
				<Suspense fallback={<DataTableSkeleton />}>
					<SegmentsRoute />
				</Suspense>
			}
		/>

		<Route
			path='new-segment'
			element={
				<Suspense fallback={<SegmentFunnelSkeleton />}>
					<NewSegmentRoute view='createSegment' />
				</Suspense>
			}
		/>

		<Route
			path=':id'
			element={
				<Suspense fallback={<SegmentViewSkeleton />}>
					<SegmentRoute />
				</Suspense>
			}
		/>

		<Route
			path=':id/edit-segment'
			element={
				<Suspense fallback={<SegmentFunnelSkeleton />}>
					<EditSegmentRoute />
				</Suspense>
			}
		/>

		<Route path='*' element={<Navigate to='.' />} />
	</Routes>
)

export default SegmentsFeatureRoutes
