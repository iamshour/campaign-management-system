//#region Import
import { lazy, Suspense } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"

import { FullViewSkeleton } from "@/ui"
const SmsTemplatesRoutesLayout = lazy(
	() => import("../components/sms-templates-routes-layout/sms-templates-routes-layout")
)
const SmsTemplatesRoute = lazy(() => import("./sms-templates-route/sms-templates-route"))
const SmsTemplateRoute = lazy(() => import("./sms-template-route/sms-template-route"))
const CreateSmsTemplateRoute = lazy(() => import("./create-sms-template-route/create-sms-template-route"))
const EditSmsTemplateRoute = lazy(() => import("./edit-sms-template-route/edit-sms-template-route"))
const SmsPrebuiltTemplatesRoute = lazy(() => import("./sms-prebuilt-templates-route/sms-prebuilt-templates-route"))
const SmsPrebuiltTemplateRoute = lazy(() => import("./sms-prebuilt-template-route/sms-prebuilt-template-route"))
//#endregion

const SmsTemplatesRoutes = () => (
	<Routes>
		<Route element={<SmsTemplatesRoutesLayout />}>
			<Route path='my-templates' element={<SmsTemplatesRoute />} />
			<Route
				path='prebuilt-templates'
				element={<SmsPrebuiltTemplatesRoute prebuiltTemplatesGridKey='sms-prebuilt-templates' />}
			/>
		</Route>

		<Route element={<SuspenseWrapper />}>
			<Route path='my-templates/:templateId' element={<SmsTemplateRoute />} />
			<Route path='my-templates/new-template' element={<CreateSmsTemplateRoute />} />
			<Route path='my-templates/:templateId/edit-template' element={<EditSmsTemplateRoute />} />
			<Route path='prebuilt-templates/:templateId' element={<SmsPrebuiltTemplateRoute />} />
		</Route>

		<Route path='*' element={<Navigate to='my-templates' />} />
	</Routes>
)

export default SmsTemplatesRoutes

const SuspenseWrapper = () => (
	<Suspense fallback={<FullViewSkeleton />}>
		<Outlet />
	</Suspense>
)
