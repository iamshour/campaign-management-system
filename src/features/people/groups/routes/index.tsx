//#region Import
import { DataTableSkeleton } from "@blueai/ui"
import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import GroupsViewSkeleton from "../views/groups-view/skeleton"

const GroupRoute = lazy(() => import("@/features/people/groups/routes/group-route"))
const GroupsRoute = lazy(() => import("@/features/people/groups/routes/groups-route"))
const AddContactsToGroupRoute = lazy(() => import("@/features/people/groups/routes/add-contacts-to-group-route"))
//#endregion

const GroupsFeatureRoutes = () => (
	<Routes>
		<Route
			path=''
			element={
				<Suspense fallback={<GroupsViewSkeleton />}>
					<GroupsRoute />
				</Suspense>
			}
		/>
		<Route
			path=':id'
			element={
				<Suspense fallback={<DataTableSkeleton />}>
					<GroupRoute />
				</Suspense>
			}
		/>

		<Route
			path=':id/add-contacts'
			element={
				<Suspense fallback={<DataTableSkeleton />}>
					<AddContactsToGroupRoute />
				</Suspense>
			}
		/>

		<Route path='*' element={<Navigate to='.' />} />
	</Routes>
)

export default GroupsFeatureRoutes
