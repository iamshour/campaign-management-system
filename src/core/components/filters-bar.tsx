//#region Import
import { Button, Skeleton, Tooltip, Transition } from "@/ui"
import IconoirFilter from "~icons/iconoir/filter"
import { memo, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import useDispatch from "../hooks/useDispatch"
import useSelector from "../hooks/useSelector"
import { toggleFiltersBar } from "../slices/app-slice"
//#endregion

const FiltersBar = ({ children }: { children: React.ReactNode }) => {
	const { isFilterBarOpen } = useSelector(({ app }) => app)

	return (
		<Transition
			as='aside'
			className='z-10 flex h-full shrink-0 flex-col justify-between overflow-hidden bg-[#edf3f7] shadow-sm'
			open={isFilterBarOpen}
			transition={{ enter: { width: 300 }, from: { width: 0 }, initial: { width: 300 } }}>
			<Suspense fallback={<Skeleton className='h-full w-full' />}>{children}</Suspense>
		</Transition>
	)
}

const Trigger = memo(({ appliedFiltersCount = 0 }: { appliedFiltersCount?: number }) => {
	const dispatch = useDispatch()

	const { isFilterBarOpen } = useSelector(({ app }) => app)

	const { t } = useTranslation("common", { keyPrefix: "filters-bar" })

	return (
		<Tooltip
			align='start'
			content={isFilterBarOpen ? t("trigger-button.minimize") : t("trigger-button.expand")}
			side='bottom'
			sideOffset={8}>
			<Button
				className='relative z-10 w-10 !overflow-visible px-0'
				onClick={() => dispatch(toggleFiltersBar())}
				variant={appliedFiltersCount > 0 ? "secondary" : "outline-grey"}>
				<IconoirFilter />
				{appliedFiltersCount > 0 && (
					<span className='absolute -end-2 -top-2 z-50 h-5 w-5 truncate rounded-full border-2 border-white bg-primary-600 text-xs flex-center'>
						{appliedFiltersCount}
					</span>
				)}
			</Button>
		</Tooltip>
	)
})

Trigger.displayName = "Trigger"

const Header = memo(({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<header
		className={twMerge(
			`relative flex w-full items-center justify-between p-4 before:absolute before:bottom-0 before:left-1/2 before:right-0 before:h-[1px]
			 before:w-[90%] before:-translate-x-1/2 before:rounded-md before:bg-gray-300`,
			className
		)}
		{...props}>
		<h2 className='whitespace-nowrap font-bold text-black'>Filter By</h2>
		{children}
	</header>
))

Header.displayName = "Header"

const Content = ({ children }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden p-4 pt-6'>{children}</div>
)

FiltersBar.Trigger = Trigger
FiltersBar.Header = Header
FiltersBar.Content = Content

export default FiltersBar
