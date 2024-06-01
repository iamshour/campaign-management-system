//#region Import
import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const ExportsRoute = lazy(() => import("@/features/people/exports/routes/exports-route"))
//#endregion

const ExportsRoutes = () => (
	<Routes>
		<Route element={<ExportsRoute />} path='' />

		<Route element={<Navigate to='.' />} path='*' />
	</Routes>
)

export default ExportsRoutes
