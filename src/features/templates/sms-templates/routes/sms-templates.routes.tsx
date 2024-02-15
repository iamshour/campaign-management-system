//#region Import
import { lazy, Suspense } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"

import { FullViewSkeleton } from "@/ui"
const SmsTemplatesLayout = lazy(() => import("../components/sms-template-layout"))
const SmsTemplatesRoute = lazy(() => import("./sms-templates-route/sms-templates-route"))
const SmsTemplateRoute = lazy(() => import("./sms-template-route/sms-template-route"))
const CreateSmsTemplateRoute = lazy(() => import("./create-sms-template-route/create-sms-template-route"))
const EditSmsTemplateRoute = lazy(() => import("./edit-sms-template-route/edit-sms-template-route"))
const SmsPrebuiltTemplatesRoute = lazy(() => import("./sms-prebuilt-templates-route/sms-prebuilt-templates-route"))
const SmsPrebuiltTemplateRoute = lazy(() => import("./sms-prebuilt-template-route/sms-prebuilt-template-route"))
//#endregion

const SmsTemplatesRoutes = () => (
	<Routes>
		<Route element={<SmsTemplatesLayout />}>
			<Route path='my-templates' element={<SmsTemplatesRoute />} />
			<Route path='prebuilt-templates' element={<SmsPrebuiltTemplatesRoute />} />
		</Route>

		<Route element={<SuspenseWrapper />}>
			<Route path='my-templates/:id' element={<SmsTemplateRoute />} />
			<Route path='my-templates/new-template' element={<CreateSmsTemplateRoute />} />
			<Route path='my-templates/:id/edit-template' element={<EditSmsTemplateRoute />} />
			<Route path='prebuilt-templates/:id' element={<SmsPrebuiltTemplateRoute />} />
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
