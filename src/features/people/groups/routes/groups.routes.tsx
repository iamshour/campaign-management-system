//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const GroupRoute = lazy(() => import("@/features/people/groups/routes/group-route/group-route"))
const GroupsRoute = lazy(() => import("@/features/people/groups/routes/groups-route/groups-route"))
const AddContactsToGroupRoute = lazy(
	() => import("@/features/people/groups/routes/add-contacts-to-group-route/add-contacts-to-group-route")
)
//#endregion

const GroupsRoutes = () => (
	<Routes>
		<Route path='' element={<GroupsRoute />} />

		<Route path=':id' element={<GroupRoute />} />

		<Route path=':id/add-contacts' element={<AddContactsToGroupRoute />} />

		<Route path='*' element={<Navigate to='.' />} />
	</Routes>
)

export default GroupsRoutes
