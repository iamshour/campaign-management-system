//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const ContactsRoute = lazy(() => import("@/features/people/contacts/routes/contacts-route"))
//#endregion

const ContactsRoutes = () => (
	<Routes>
		<Route element={<ContactsRoute />} path='' />

		<Route element={<Navigate to='.' />} path='*' />
	</Routes>
)

export default ContactsRoutes
