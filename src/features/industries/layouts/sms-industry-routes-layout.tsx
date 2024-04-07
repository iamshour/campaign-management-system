//#region Import
import { DataTableSkeleton, NavTabs } from "@/ui"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
//#endregion

const SmsIndustryRoutesLayout = () => (
	<div className='flex h-full w-full flex-col'>
		<NavTabs>
			<NavTabs.Item to='.'>SMS</NavTabs.Item>
		</NavTabs>

		<Suspense fallback={<DataTableSkeleton />}>
			<Outlet />
		</Suspense>
	</div>
)

export default SmsIndustryRoutesLayout
