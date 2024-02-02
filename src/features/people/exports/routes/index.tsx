//#region Import
import { DataTableSkeleton } from "@/ui"
import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const ExportsRoute = lazy(() => import("@/features/people/exports/routes/exports-route"))
//#endregion

const ExportsFeatureRoutes = () => (
	<Routes>
		<Route
			path=''
			element={
				<Suspense fallback={<DataTableSkeleton />}>
					<ExportsRoute />
				</Suspense>
			}
		/>

		<Route path='*' element={<Navigate to='.' />} />
	</Routes>
)

export default ExportsFeatureRoutes
