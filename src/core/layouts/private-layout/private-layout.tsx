//#region Import
import { twMerge } from "@package/ui"
import Skeleton from "@package/ui/src/skeleton"
import { Suspense, lazy } from "react"
import { Outlet } from "react-router-dom"

import useSelector from "@/core/hooks/useSelector"

const Navbar = lazy(() => import("./navbar"))
const Topbar = lazy(() => import("./topbar"))
//#endregion

const PrivateLayout = () => {
	const isNavbarOpen = useSelector(({ app }) => app.isNavbarOpen)

	return (
		<main className='flex overflow-hidden'>
			<Suspense
				fallback={
					<div className={twMerge("flex flex-col gap-5 bg-[#054060] p-4", isNavbarOpen ? "w-[250px]" : "w-[78px]")}>
						{Array.from({ length: 10 }, (_, idx) => (
							<Skeleton key={idx} className='h-[44px] w-full bg-opacity-30' />
						))}
					</div>
				}>
				<Navbar />
			</Suspense>

			<main className='flex h-screen w-screen flex-1 flex-col overflow-hidden'>
				<Suspense
					fallback={
						<div className='h-[67px] bg-[#edf3f7] p-4'>
							<Skeleton className='h-full bg-white' />
						</div>
					}>
					<Topbar />
				</Suspense>

				<section className='relative flex h-full flex-1 overflow-hidden'>
					<Outlet />
				</section>
			</main>
		</main>
	)
}

export default PrivateLayout
