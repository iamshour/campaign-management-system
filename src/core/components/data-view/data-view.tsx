//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { IconType, PaginationProps } from "@/ui"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { Button, Pagination, SearchInput, TableSkeleton, Tooltip } from "@/ui"
import NoResultsFound from "@/ui/errors/no-results-found"
import { lazy, memo, Suspense, useCallback, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import type { DataTableProps, RowData } from "./data-table/types"
import type { DataViewProps, DataViewRenderType, Selection } from "./types"

import DefaultFiltersBar from "../filters-bar"
import IconTooltip from "../icon-tooltip/icon-tooltip"
import DataTable from "./data-table/data-table"
import DataViewContext, { useDataViewContext } from "./data-view-context"
import {
	clearFilters,
	clearSelection,
	selectPaginationAndSorting,
	selectSelection,
	selectView,
	toggleView,
	updatePaginationAndSorting,
	updateSearch,
	updateSelection,
} from "./data-view-slice"
//#endregion

const DataView = <TData extends RowData>({
	children,
	className,
	columns,
	count,
	dataViewKey,
	list,
	...restValue
}: DataViewProps<TData>) => {
	const dispatch = useDispatch()

	const selection = useSelector<Selection>((state) => selectSelection(state, dataViewKey))

	useEffect(() => {
		return () => {
			dispatch(clearSelection(dataViewKey))
		}
	}, [dispatch, dataViewKey])

	const selectionPerPage = useMemo(() => {
		if (!count || !selection) return 0

		if (selection === "ALL") return count

		const rowIdSelector = columns.find(({ accessorKey }) => accessorKey === "selection")?.rowIdSelector

		if (!rowIdSelector) return 0

		return list?.filter((row) => selection?.includes(row[rowIdSelector]))?.length
	}, [count, selection, list, columns])

	return (
		<DataViewContext.Provider value={{ columns, count, dataViewKey, list, selectionPerPage, ...restValue }}>
			<div className={twMerge("flex h-full w-full flex-1 overflow-hidden", className)}>{children}</div>
		</DataViewContext.Provider>
	)
}

const FiltersBar = (props: React.ComponentPropsWithoutRef<typeof DefaultFiltersBar>) => <DefaultFiltersBar {...props} />

const FiltersBarFooter = memo(() => {
	const dispatch = useDispatch()

	const { t } = useTranslation("common", { keyPrefix: "filters-bar" })

	const { dataViewKey } = useDataViewContext()

	return (
		<footer className='p-3 shadow-inner'>
			<Button
				className='h-max w-full py-2 text-lg text-primary-600'
				onClick={() => dispatch(clearFilters(dataViewKey))}
				size='lg'
				variant='ghost'>
				{t("actions.clear-all")}
			</Button>
		</footer>
	)
})

FiltersBarFooter.displayName = "FiltersBarFooter"

const Content = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={twMerge("flex h-full w-[calc(100%-300px)] max-w-full flex-1 flex-col px-6", className)} {...props} />
)

interface TopBarProps extends Pick<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
	withFilters?: boolean
}
const TopBar = memo(({ children, className, withFilters = true }: TopBarProps) => {
	const dispatch = useDispatch()

	const { dataViewKey } = useDataViewContext()

	const { appliedFiltersCount, searchTerm } = useSelector(({ dataView }) => dataView[dataViewKey])

	const onSearchChange = useCallback(
		(searchTerm?: string) => dispatch(updateSearch({ [dataViewKey]: searchTerm })),
		[dispatch, dataViewKey]
	)

	return (
		<div className={twMerge("flex w-full items-center justify-between gap-2 py-6", className)}>
			<div className='flex gap-2'>
				{withFilters && <DefaultFiltersBar.Trigger appliedFiltersCount={appliedFiltersCount} />}

				<SearchInput className='max-w-[14rem] md:max-w-[18rem]' onChange={onSearchChange} value={searchTerm} />
			</div>
			{children}
		</div>
	)
})

TopBar.displayName = "TopBar"

interface DataViewBodyProps<TData extends RowData> extends DataTableProps<TData> {
	GridCard?: (props: TData) => JSX.Element
}
const DataViewBody = <TData extends RowData>({ GridCard, ...props }: DataViewBodyProps<TData>) => {
	const { columns, count, dataViewKey, list } = useDataViewContext<TData>()

	const view = useSelector<DataViewRenderType | undefined>((state) => selectView(state, dataViewKey))

	if (view === "GRID") {
		if (!count) return <NoResultsFound />

		return (
			<div className='flex max-w-full flex-wrap gap-6 overflow-y-auto p-4'>
				{!GridCard ? (
					<>Please pass a Grid Card to render Grid view properly</>
				) : (
					list.map((item, idx) => <GridCard key={idx} {...item} />)
				)}
			</div>
		)
	}

	return (
		<Suspense fallback={<TableSkeleton className='mb-4 flex-1 px-0' colsLength={columns?.length} />}>
			<DataTable {...props} />
		</Suspense>
	)
}

const MultiViewLayout = memo(({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch()

	const { dataViewKey } = useDataViewContext()

	const view = useSelector<DataViewRenderType | undefined>((state) => selectView(state, dataViewKey))

	return (
		<div className='flex h-full w-full flex-col overflow-hidden'>
			<div className='mb-4 inline-flex w-max gap-2.5 place-self-end'>
				{viewsTriggerButtons.map(({ icon: Icon, key, title }) => (
					<Tooltip align='end' content={title} key={key} side='bottom' sideOffset={8}>
						<Button
							active={key === view}
							className='flex h-[40px] w-[40px] rounded-md'
							onClick={() => dispatch(toggleView({ [dataViewKey]: key }))}
							variant='outline-grey'>
							<Icon className='text-lg' />
							<p className='sr-only'>{title}</p>
						</Button>
					</Tooltip>
				))}
			</div>

			{children}
		</div>
	)
})

MultiViewLayout.displayName = "MultiViewLayout"

const DataViewPagination = (props: Pick<PaginationProps, "children" | "pageLimits">) => {
	const dispatch = useDispatch()

	const { count, dataViewKey } = useDataViewContext()

	const paginationAndSorting = useSelector<PaginationAndSorting<any>>((state) =>
		selectPaginationAndSorting(state, dataViewKey)
	)

	return (
		<Pagination
			count={count}
			pagination={paginationAndSorting}
			updatePagination={(pagination) => dispatch(updatePaginationAndSorting({ [dataViewKey]: pagination }))}
			{...props}
		/>
	)
}

const PaginationMessage = memo(() => {
	const dispatch = useDispatch()

	const { t } = useTranslation("ui", { keyPrefix: "table.pagination.messages" })

	const { count, dataViewKey, selectionPerPage } = useDataViewContext()

	const selection = useSelector<Selection>((state) => selectSelection(state, dataViewKey))

	const isEverythingSelected = useMemo(() => selection === "ALL" || selection?.length === count, [count, selection])

	return (
		<div className='text-muted-foreground m-4 flex w-max flex-wrap items-center text-xs'>
			<div className='h-full gap-2 rounded-s-md border-e-4 border-e-white bg-gray-200/60 px-4 text-black inline-flex-center'>
				<span className='font-medium'>{t("totalEntries")}:</span> {count}
			</div>
			<div
				className='h-full gap-2 border-e-4 border-e-white bg-gray-200/60 px-4 text-black transition-colors inline-flex-center data-[active=true]:bg-primary-50'
				data-active={!!selectionPerPage}>
				<span className='font-medium'>{t("selectedPerPage")}:</span> {selectionPerPage}
			</div>
			<div
				className='h-full gap-2 rounded-e-md bg-gray-200/60 px-4 text-black transition-colors inline-flex-center data-[active=true]:bg-primary-50'
				data-active={!!selection?.length}>
				<span className='font-medium'>{t("totalSelected")}:</span>
				{!selection ? 0 : selection === "ALL" ? count : selection?.length}

				{!!selection?.length && (
					<Button
						className='h-max py-1.5 pe-0 text-primary-800'
						onClick={() => dispatch(updateSelection({ [dataViewKey]: isEverythingSelected ? [] : "ALL" }))}
						size='xs'
						variant='link'>
						{isEverythingSelected ? t("clearAllAction") : t("selectAllAction")}

						<IconTooltip
							content={isEverythingSelected ? t("clearEverythingTooltip") : t("selectEverythingTooltip", { count })}
						/>
					</Button>
				)}
			</div>
		</div>
	)
})

PaginationMessage.displayName = "PaginationMessage"

// Exposing Components on DataView.FiltersBar: Header and Content from DefaultFiltersBar, and a custom Footer created above (FiltersBarFooter)
FiltersBar.Header = DefaultFiltersBar.Header
FiltersBar.Content = DefaultFiltersBar.Content
FiltersBar.Footer = FiltersBarFooter
DataView.FiltersBar = FiltersBar

DataView.Content = Content
DataView.MultiViewLayout = MultiViewLayout
DataView.Body = DataViewBody

DataView.TopBar = TopBar

// Exposing PaginationMessage on DataView.Pasgination.Message
DataViewPagination.Message = PaginationMessage
DataView.Pagination = DataViewPagination

export default DataView

const viewsTriggerButtons: {
	icon: React.LazyExoticComponent<IconType>
	key: DataViewRenderType
	title: string
}[] = [
	{ icon: lazy(() => import("~icons/material-symbols/format-list-bulleted-rounded")), key: "LIST", title: "List View" },
	{ icon: lazy(() => import("~icons/teenyicons/grid-layout-solid")), key: "GRID", title: "Grid View" },
]
