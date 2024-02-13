//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const ContactsRoute = lazy(() => import("@/features/people/contacts/routes/contacts-route"))
//#endregion

const ContactsFeatureRoutes = () => (
	<Routes>
		<Route path='' element={<ContactsRoute />} />

		<Route path='*' element={<Navigate to='.' />} />
	</Routes>
)

export default ContactsFeatureRoutes
