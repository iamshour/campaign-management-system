//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const ContactsRoute = lazy(() => import("@/features/people/contacts/routes/contacts-route/contacts-route"))
//#endregion

const ContactsRoutes = () => (
	<Routes>
		<Route path='' element={<ContactsRoute />} />

		<Route path='*' element={<Navigate to='.' />} />
	</Routes>
)

export default ContactsRoutes
