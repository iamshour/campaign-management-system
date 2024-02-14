//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const ExportsRoute = lazy(() => import("@/features/people/exports/routes/exports-route/exports-route"))
//#endregion

const ExportsRoutes = () => (
	<Routes>
		<Route path='' element={<ExportsRoute />} />

		<Route path='*' element={<Navigate to='.' />} />
	</Routes>
)

export default ExportsRoutes
