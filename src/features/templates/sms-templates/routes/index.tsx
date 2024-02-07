//#region Import
import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { DataTableSkeleton, FullViewSkeleton } from "@/ui"

const SmsTemplatesLayout = lazy(() => import("../components/sms-template-layout"))
const SmsTemplatesRoute = lazy(() => import("@/features/templates/sms-templates/routes/sms-templates-route"))
const SmsTemplateRoute = lazy(() => import("@/features/templates/sms-templates/routes/sms-template-route"))
const CreateSmsTemplateRoute = lazy(() => import("@/features/templates/sms-templates/routes/create-sms-template-route"))
const EditSmsTemplateRoute = lazy(() => import("@/features/templates/sms-templates/routes/edit-sms-template-route"))
const SmsPrebuiltTemplatesRoute = lazy(
	() => import("@/features/templates/sms-templates/routes/sms-prebuilt-templates-route")
)
const SmsPrebuiltTemplateRoute = lazy(() => import("./sms-prebuilt-template-route"))
//#endregion

const SmsTemplatesFeatureRoutes = () => (
	<Routes>
		<Route
			element={
				<Suspense fallback={<DataTableSkeleton />}>
					<SmsTemplatesLayout />
				</Suspense>
			}>
			<Route path='my-templates' element={<SmsTemplatesRoute />} />
			<Route path='prebuilt-templates' element={<SmsPrebuiltTemplatesRoute />} />
		</Route>

		<Route
			path='my-templates/:id'
			element={
				<Suspense fallback={<FullViewSkeleton />}>
					<SmsTemplateRoute />
				</Suspense>
			}
		/>

		<Route
			path='my-templates/new-template'
			element={
				<Suspense fallback={<DataTableSkeleton />}>
					<CreateSmsTemplateRoute />
				</Suspense>
			}
		/>

		<Route
			path='my-templates/:id/edit-template'
			element={
				<Suspense fallback={<DataTableSkeleton />}>
					<EditSmsTemplateRoute />
				</Suspense>
			}
		/>

		<Route
			path='prebuilt-templates/:id'
			element={
				<Suspense fallback={<FullViewSkeleton />}>
					<SmsPrebuiltTemplateRoute />
				</Suspense>
			}
		/>

		<Route path='*' element={<Navigate to='my-templates' />} />
	</Routes>
)

export default SmsTemplatesFeatureRoutes
