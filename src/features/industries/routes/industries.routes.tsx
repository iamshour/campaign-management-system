//#region Import
import { Suspense, lazy } from "react"
import { Outlet, Route, Routes } from "react-router-dom"

import { FullViewSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const SmsIndustryRoutesLayout = lazy(
	() => import("../components/sms-industry-routes-layout/sms-industry-routes-layout")
)
const IndustriesRoute = lazy(() => import("./industries-route/industries-route"))
const SmsIndustryTemplatesRoute = lazy(() => import("./sms-industry-templates-route/sms-industry-templates-route"))
const SmsIndustryTemplateRoute = lazy(() => import("./sms-industry-template-route/sms-industry-template-route"))
const EditSmsIndustryTemplateRoute = lazy(
	() => import("./edit-sms-industry-template-route/edit-sms-industry-template-route")
)
const CreateSmsIndustryTemplateRoute = lazy(
	() => import("./create-sms-industry-template-route/create-sms-industry-template-route")
)
//#endregion

const IndustriesFeatureRoutes = () => (
	<Routes>
		<Route path='' element={<IndustriesRoute />} />

		<Route element={<SmsIndustryRoutesLayout />}>
			<Route path=':industryId/sms' element={<SmsIndustryTemplatesRoute />} />
		</Route>

		<Route element={<SuspenseWrapper />}>
			<Route path=':industryId/sms/:templatedId' element={<SmsIndustryTemplateRoute />} />
			<Route path=':industryId/sms/:templateId/edit-template' element={<EditSmsIndustryTemplateRoute />} />
			<Route path=':industryId/sms/new-template' element={<CreateSmsIndustryTemplateRoute />} />
		</Route>

		{/* FALLBACK PATH  */}
		<Route path='*' element={<DisplayError />} />
	</Routes>
)

export default IndustriesFeatureRoutes

const SuspenseWrapper = () => (
	<Suspense fallback={<FullViewSkeleton />}>
		<Outlet />
	</Suspense>
)
