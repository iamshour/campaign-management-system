//#region Import
import { lazy, Suspense } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"

import { FullViewSkeleton } from "@/ui"
const SmsTemplatesLayout = lazy(() => import("../components/sms-template-layout"))
const SmsTemplatesRoute = lazy(
	() => import("@/features/templates/sms-templates/routes/sms-templates-route/sms-templates-route")
)
const SmsTemplateRoute = lazy(
	() => import("@/features/templates/sms-templates/routes/sms-template-route/sms-template-route")
)
const CreateSmsTemplateRoute = lazy(
	() => import("@/features/templates/sms-templates/routes/create-sms-template-route/create-sms-template-route")
)
const EditSmsTemplateRoute = lazy(
	() => import("@/features/templates/sms-templates/routes/edit-sms-template-route/edit-sms-template-route")
)
const SmsPrebuiltTemplatesView = lazy(
	() => import("@/features/templates/sms-templates/views/sms-prebuilt-templates-view/sms-prebuilt-templates-view")
)
const SmsPrebuiltTemplateRoute = lazy(() => import("./sms-prebuilt-template-route/sms-prebuilt-template-route"))
//#endregion

const SmsTemplatesRoutes = () => (
	<Routes>
		<Route element={<SmsTemplatesLayout />}>
			<Route path='my-templates' element={<SmsTemplatesRoute />} />
			<Route path='prebuilt-templates' element={<SmsPrebuiltTemplatesView />} />
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
