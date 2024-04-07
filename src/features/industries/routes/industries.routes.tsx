//#region Import
import { FullViewSkeleton } from "@/ui"
import { lazy, Suspense } from "react"
import { Outlet, Route, Routes } from "react-router-dom"

import SmsIndustryRoutesLayout from "../layouts/sms-industry-routes-layout"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const IndustriesRoute = lazy(() => import("./industries-route"))

const SmsIndustryTemplatesRoute = lazy(() => import("./sms-industry-templates-route"))

const SmsIndustryTemplateRoute = lazy(() => import("./sms-industry-template-route"))

const EditSmsIndustryTemplateRoute = lazy(() => import("./edit-sms-industry-template-route"))

const CreateSmsIndustryTemplateRoute = lazy(() => import("./create-sms-industry-template-route"))
//#endregion

const IndustriesFeatureRoutes = () => (
	<Routes>
		<Route element={<IndustriesRoute />} path='' />

		<Route element={<SmsIndustryRoutesLayout />}>
			<Route element={<SmsIndustryTemplatesRoute />} path=':industryId/sms' />
		</Route>

		<Route element={<SuspenseWrapper />}>
			<Route element={<SmsIndustryTemplateRoute />} path=':industryId/sms/:templatedId' />
			<Route element={<EditSmsIndustryTemplateRoute />} path=':industryId/sms/:templateId/edit-template' />
			<Route element={<CreateSmsIndustryTemplateRoute />} path=':industryId/sms/new-template' />
		</Route>

		{/* FALLBACK PATH  */}
		<Route element={<DisplayError />} path='*' />
	</Routes>
)

export default IndustriesFeatureRoutes

const SuspenseWrapper = () => (
	<Suspense fallback={<FullViewSkeleton />}>
		<Outlet />
	</Suspense>
)
