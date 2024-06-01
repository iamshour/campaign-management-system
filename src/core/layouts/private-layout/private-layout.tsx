//#region Import
import useSelector from "@/core/hooks/useSelector"
import { DataTableSkeleton, Skeleton } from "@/ui"
import { lazy, Suspense } from "react"
import { Outlet } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const Navbar = lazy(() => import("./navbar/navbar"))

const Topbar = lazy(() => import("./topbar/topbar"))
//#endregion

const PrivateLayout = () => {
	const isNavOpen = useSelector(({ app }) => app.isNavOpen)

	return (
		<main className='flex overflow-hidden'>
			<Suspense
				fallback={
					<div className={twMerge("flex flex-col gap-5 bg-[#054060] p-4", isNavOpen ? "w-[250px]" : "w-[78px]")}>
						{Array.from({ length: 10 }, (_, idx) => (
							<Skeleton className='h-[44px] w-full bg-opacity-30' key={idx} />
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
					<Suspense fallback={<DataTableSkeleton />}>
						<Outlet />
					</Suspense>
				</section>
			</main>
		</main>
	)
}

export default PrivateLayout
