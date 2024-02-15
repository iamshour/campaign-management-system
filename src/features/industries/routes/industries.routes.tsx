//#region Import
import { Suspense, lazy } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"

import { FullViewSkeleton } from "@/ui"

const IndustriesRoute = lazy(() => import("./industries-route/industries-route"))
const IndustryTemplatesRoute = lazy(() => import("./industry-templates-route/industry-templates-route"))
const IndustryTemplateRoute = lazy(() => import("./industry-template-route/industry-template-route"))
const EditSmsIndustryTemplateRoute = lazy(() => import("./edit-sms-industry-template/edit-sms-industry-template"))
const CreateSmsIndustryTemplateRoute = lazy(() => import("./create-sms-industry-template/create-sms-industry-template"))
//#endregion

const IndustriesFeatureRoutes = () => (
	<Routes>
		<Route path='' element={<IndustriesRoute />} />
		<Route path=':id' element={<IndustryTemplatesRoute />} />

		<Route element={<SuspenseWrapper />}>
			<Route path=':id/:templatedId' element={<IndustryTemplateRoute />} />
			<Route path=':id/:templateId/edit-template' element={<EditSmsIndustryTemplateRoute />} />
			<Route path=':id/new-template' element={<CreateSmsIndustryTemplateRoute />} />
		</Route>

		{/* FALLBACK PATH  */}
		<Route path='*' element={<Navigate to='.' />} />
	</Routes>
)

export default IndustriesFeatureRoutes

const SuspenseWrapper = () => (
	<Suspense fallback={<FullViewSkeleton />}>
		<Outlet />
	</Suspense>
)
