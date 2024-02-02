//#region Import
import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { DataTableSkeleton } from "@/ui"

const ContactsRoute = lazy(() => import("@/features/people/contacts/routes/contacts-route"))
//#endregion

const ContactsFeatureRoutes = () => (
	<Routes>
		<Route
			path=''
			element={
				<Suspense fallback={<DataTableSkeleton />}>
					<ContactsRoute />
				</Suspense>
			}
		/>

		<Route path='*' element={<Navigate to='.' />} />
	</Routes>
)

export default ContactsFeatureRoutes
