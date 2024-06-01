//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const GroupRoute = lazy(() => import("@/features/people/groups/routes/group-route"))

const GroupsRoute = lazy(() => import("@/features/people/groups/routes/groups-route"))

const AddContactsToGroupRoute = lazy(() => import("@/features/people/groups/routes/add-contacts-to-group-route"))
//#endregion

const GroupsRoutes = () => (
	<Routes>
		<Route element={<GroupsRoute />} path='' />

		<Route element={<GroupRoute />} path=':groupId' />

		<Route element={<AddContactsToGroupRoute />} path=':groupId/add-contacts' />

		<Route element={<Navigate to='.' />} path='*' />
	</Routes>
)

export default GroupsRoutes
