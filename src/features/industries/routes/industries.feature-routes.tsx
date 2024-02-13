//#region Import
import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const IndustriesRoute = lazy(() => import("./industries-route"))
const IndustryTemplatesRoute = lazy(() => import("./industry-templates-route"))
const IndustryTemplateRoute = lazy(() => import("./industry-template-route"))
//#endregion

const IndustriesFeatureRoutes = () => (
	<Routes>
		<Route path='' element={<IndustriesRoute />} />

		<Route path=':id' element={<IndustryTemplatesRoute />} />

		<Route path=':id/:templatedId' element={<IndustryTemplateRoute />} />

		{/* FALLBACK PATH  */}
		<Route path='*' element='.' />
	</Routes>
)

export default IndustriesFeatureRoutes
