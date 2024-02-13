//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const ExportsRoute = lazy(() => import("@/features/people/exports/routes/exports-route"))
//#endregion

const ExportsFeatureRoutes = () => (
	<Routes>
		<Route path='' element={<ExportsRoute />} />

		<Route path='*' element={<Navigate to='.' />} />
	</Routes>
)

export default ExportsFeatureRoutes
