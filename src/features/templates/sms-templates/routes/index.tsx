//#region Import
import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { DataTableSkeleton } from "@/ui"

const SmsTemplatesLayout = lazy(() => import("../components/sms-template-layout"))
const MySmsTemplatesRoute = lazy(() => import("@/features/templates/sms-templates/routes/my-sms-templates-route"))
const MySmsTemplateRoute = lazy(() => import("@/features/templates/sms-templates/routes/my-sms-template-route"))
const PrebuiltSmsTemplatesRoute = lazy(
	() => import("@/features/templates/sms-templates/routes/prebuilt-sms-templates-route")
)
//#endregion

const SmsTemplatesFeatureRoutes = () => (
	<Routes>
		<Route
			element={
				<Suspense fallback={<DataTableSkeleton />}>
					<SmsTemplatesLayout />
				</Suspense>
			}>
			<Route path='my-templates' element={<MySmsTemplatesRoute />} />

			<Route path='prebuilt-templates' element={<PrebuiltSmsTemplatesRoute />} />
		</Route>

		<Route
			path='my-templates/:id'
			element={
				<Suspense fallback={<DataTableSkeleton />}>
					<MySmsTemplateRoute />
				</Suspense>
			}
		/>

		<Route path='*' element={<Navigate to='my-templates' />} />
	</Routes>
)

export default SmsTemplatesFeatureRoutes
