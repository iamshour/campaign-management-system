//#region Import
import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const IndustriesRoute = lazy(() => import("./industries-route"))
const IndustryTemplatesRoute = lazy(() => import("./industry-templates-route"))
//#endregion

const IndustriesFeatureRoutes = () => (
	<Routes>
		<Route path='' element={<IndustriesRoute />} />

		<Route path=':id' element={<IndustryTemplatesRoute />} />

		{/* FALLBACK PATH  */}
		<Route path='*' element='.' />
	</Routes>
)

export default IndustriesFeatureRoutes
