//#region Import
import { FullViewSkeleton } from "@/ui"
import { lazy, Suspense } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
const SmsTemplatesRoutesLayout = lazy(() => import("../components/sms-templates-routes-layout"))

const SmsTemplatesRoute = lazy(() => import("./sms-templates-route"))

const SmsTemplateRoute = lazy(() => import("./sms-template-route"))

const CreateSmsTemplateRoute = lazy(() => import("./create-sms-template-route"))

const EditSmsTemplateRoute = lazy(() => import("./edit-sms-template-route"))

const SmsPrebuiltTemplatesRoute = lazy(() => import("./sms-prebuilt-templates-route"))

const SmsPrebuiltTemplateRoute = lazy(() => import("./sms-prebuilt-template-route"))
//#endregion

const SmsTemplatesRoutes = () => (
	<Routes>
		<Route element={<SmsTemplatesRoutesLayout />}>
			<Route element={<SmsTemplatesRoute />} path='my-templates' />
			<Route
				element={<SmsPrebuiltTemplatesRoute prebuiltTemplatesGridKey='sms-prebuilt-templates' />}
				path='prebuilt-templates'
			/>
		</Route>

		<Route element={<SuspenseWrapper />}>
			<Route element={<SmsTemplateRoute />} path='my-templates/:templateId' />
			<Route element={<CreateSmsTemplateRoute />} path='my-templates/new-template' />
			<Route element={<EditSmsTemplateRoute />} path='my-templates/:templateId/edit-template' />
			<Route element={<SmsPrebuiltTemplateRoute />} path='prebuilt-templates/:templateId' />
		</Route>

		<Route element={<Navigate to='my-templates' />} path='*' />
	</Routes>
)

export default SmsTemplatesRoutes

const SuspenseWrapper = () => (
	<Suspense fallback={<FullViewSkeleton />}>
		<Outlet />
	</Suspense>
)
