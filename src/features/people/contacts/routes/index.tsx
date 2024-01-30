//#region Import
import DataTableSkeleton from "@package/ui/src/skeletons/data-table-skeleton"
import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

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
