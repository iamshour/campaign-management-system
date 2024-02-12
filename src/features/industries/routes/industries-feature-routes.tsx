//#region Import
import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"

import { DataTableSkeleton } from "@/ui"

const IndustriesRoute = lazy(() => import("./industries-route"))
//#endregion

const IndustriesFeatureRoutes = () => (
	<Routes>
		<Route
			path=''
			element={
				<Suspense fallback={<DataTableSkeleton />}>
					<IndustriesRoute />
				</Suspense>
			}
		/>

		{/* FALLBACK PATH  */}
		<Route path='*' element='.' />
	</Routes>
)

export default IndustriesFeatureRoutes
