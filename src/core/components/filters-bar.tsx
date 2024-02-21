//#region Import
import { Suspense } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import { Button, Transition, Skeleton, Tooltip } from "@/ui"

import useDispatch from "../hooks/useDispatch"
import useSelector from "../hooks/useSelector"
import { toggleFiltersBar } from "../slices/app-slice"

import IconoirFilter from "~icons/iconoir/filter"
//#endregion

const FiltersBar = ({ children }: { children: React.ReactNode }) => {
	const { isFilterBarOpen } = useSelector(({ app }) => app)

	return (
		<Transition
			as='aside'
			open={isFilterBarOpen}
			transition={{ from: { width: 0 }, enter: { width: 300 }, initial: { width: 300 } }}
			className='z-10 flex h-full shrink-0 flex-col justify-between overflow-hidden bg-[#edf3f7] shadow-sm'>
			<Suspense fallback={<Skeleton className='h-full w-full' />}>{children}</Suspense>
		</Transition>
	)
}

const Trigger = ({ appliedFiltersCount = 0 }: { appliedFiltersCount?: number }) => {
	const dispatch = useDispatch()

	const { isFilterBarOpen } = useSelector(({ app }) => app)

	const { t } = useTranslation("common", { keyPrefix: "filters-bar" })

	return (
		<Tooltip>
			<Tooltip.Trigger asChild>
				<Button
					variant={appliedFiltersCount > 0 ? "secondary" : "outline-grey"}
					onClick={() => dispatch(toggleFiltersBar())}
					className='relative z-10 w-10 !overflow-visible px-0'>
					<IconoirFilter />
					{appliedFiltersCount > 0 && (
						<span className='absolute -end-2 -top-2 z-50 h-5 w-5 truncate rounded-full border-2 border-white bg-primary-600 text-xs flex-center'>
							{appliedFiltersCount}
						</span>
					)}
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content
				content={isFilterBarOpen ? t("trigger-button.minimize") : t("trigger-button.expand")}
				side='bottom'
				align='start'
				sideOffset={8}
			/>
		</Tooltip>
	)
}

const Header = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<header
		className={twMerge(
			"relative flex w-full items-center justify-between p-4 before:absolute before:bottom-0 before:left-1/2 before:right-0 before:h-[1px] before:w-[90%] before:-translate-x-1/2 before:rounded-md before:bg-gray-300",
			className
		)}
		{...props}>
		<h2 className='whitespace-nowrap font-bold text-black'>Filter By</h2>
		{children}
	</header>
)

const Content = ({ children }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden p-4 pt-6'>{children}</div>
)

FiltersBar.Trigger = Trigger
FiltersBar.Header = Header
FiltersBar.Content = Content

export default FiltersBar
