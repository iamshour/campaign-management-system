//#region Import
import type { DataGridView } from "@/core/slices/data-grid-slice/types"
import type { IconType, PaginationProps } from "@/ui"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import {
	clearFilters,
	clearSelection,
	toggleDataGridView,
	updatePaginationAndSorting,
	updateSearch,
	updateSelection,
} from "@/core/slices/data-grid-slice/data-grid-slice"
import { Button, Pagination, SearchInput, TableSkeleton, Tooltip } from "@/ui"
import NoResultsFound from "@/ui/errors/no-results-found"
import { createContext, lazy, memo, Suspense, useCallback, useContext, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import type { DataGridProps, DataGridTableProps, RowData } from "./types"

import DefaultFiltersBar from "../filters-bar"
import IconTooltip from "../icon-tooltip/icon-tooltip"
import DataGridTable from "./data-grid-table/data-grid-table"
//#endregion

type DataGridContextValue<TData extends RowData> = Omit<DataGridProps<TData>, "children" | "className"> & {
	selectionPerPage: number
}
const DataGridContext = createContext({} as DataGridContextValue<any>)

// eslint-disable-next-line
export const useDataGridContext = <TData extends RowData>(): DataGridContextValue<TData> =>
	useContext(DataGridContext as React.Context<DataGridContextValue<TData>>)

const DataGrid = <TData extends RowData>({
	children,
	className,
	columns,
	count,
	dataGridKey,
	list,
	...restValue
}: DataGridProps<TData>) => {
	const dispatch = useDispatch()

	const selection = useSelector(({ dataGrid }) => dataGrid[dataGridKey]?.selection)

	useEffect(() => {
		return () => {
			dispatch(clearSelection(dataGridKey))
		}
	}, [dispatch, dataGridKey])

	const selectionPerPage = useMemo(() => {
		if (!count || !selection) return 0

		if (selection === "ALL") return count

		const rowIdSelector = columns.find(({ accessorKey }) => accessorKey === "selection")?.rowIdSelector

		if (!rowIdSelector) return 0

		return list?.filter((row) => selection?.includes(row[rowIdSelector]))?.length
	}, [count, selection, list, columns])

	return (
		<DataGridContext.Provider value={{ columns, count, dataGridKey, list, selectionPerPage, ...restValue }}>
			<div className={twMerge("flex h-full w-full flex-1 overflow-hidden", className)}>{children}</div>
		</DataGridContext.Provider>
	)
}

const FiltersBar = (props: React.ComponentPropsWithoutRef<typeof DefaultFiltersBar>) => <DefaultFiltersBar {...props} />

const FiltersBarFooter = memo(() => {
	const dispatch = useDispatch()

	const { t } = useTranslation("common", { keyPrefix: "filters-bar" })

	const { dataGridKey } = useDataGridContext()

	return (
		<footer className='p-3 shadow-inner'>
			<Button
				className='h-max w-full py-2 text-lg text-primary-600'
				onClick={() => dispatch(clearFilters(dataGridKey))}
				size='lg'
				variant='ghost'>
				{t("actions.clear-all")}
			</Button>
		</footer>
	)
})

FiltersBarFooter.displayName = "FiltersBarFooter"

const Content = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={twMerge("flex h-full w-[calc(100%-300px)] max-w-full flex-1 flex-col px-4", className)} {...props} />
)

type TopBarProps = { children?: React.ReactNode; withFilters?: boolean }
const TopBar = memo(({ children, withFilters = true }: TopBarProps) => {
	const dispatch = useDispatch()

	const { dataGridKey } = useDataGridContext()

	const { appliedFiltersCount, searchTerm } = useSelector(({ dataGrid }) => dataGrid[dataGridKey])

	const onSearchChange = useCallback(
		(searchTerm?: string) => dispatch(updateSearch({ [dataGridKey]: searchTerm })),
		[dispatch, dataGridKey]
	)

	return (
		<div className='flex w-full items-center justify-between gap-2 py-4'>
			<div className='flex gap-2'>
				{withFilters && <DefaultFiltersBar.Trigger appliedFiltersCount={appliedFiltersCount} />}

				<SearchInput className='max-w-[14rem] md:max-w-[18rem]' onChange={onSearchChange} value={searchTerm} />
			</div>
			{children}
		</div>
	)
})

TopBar.displayName = "TopBar"

type DataGridBodyProps<TData extends RowData> = DataGridTableProps<TData> & {
	GridCard?: (props: TData) => JSX.Element
}

const DataGridBody = <TData extends RowData>({ GridCard, ...props }: DataGridBodyProps<TData>) => {
	const { columns, count, dataGridKey, list } = useDataGridContext<TData>()

	const { view } = useSelector(({ dataGrid }) => dataGrid[dataGridKey])

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
			<DataGridTable {...props} />
		</Suspense>
	)
}

const MultiViewLayout = memo(({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch()

	const { dataGridKey } = useDataGridContext()

	const view = useSelector(({ dataGrid }) => dataGrid[dataGridKey].view)

	return (
		<div className='flex h-full w-full flex-col overflow-hidden'>
			<div className='mb-4 inline-flex w-max gap-2.5 place-self-end'>
				{viewsTriggerButtons.map(({ icon: Icon, key, title }) => (
					<Tooltip key={key}>
						<Tooltip.Trigger asChild>
							<Button
								active={key === view}
								className='flex h-[40px] w-[40px] rounded-md'
								onClick={() => dispatch(toggleDataGridView({ [dataGridKey]: key }))}
								variant='outline-grey'>
								<Icon className='text-lg' />
								<p className='sr-only'>{title}</p>
							</Button>
						</Tooltip.Trigger>

						<Tooltip.Content align='end' content={title} side='bottom' sideOffset={8} />
					</Tooltip>
				))}
			</div>

			{children}
		</div>
	)
})

MultiViewLayout.displayName = "MultiViewLayout"

const DataGridPagination = (props: Pick<PaginationProps, "children" | "pageLimits">) => {
	const dispatch = useDispatch()

	const { count, dataGridKey } = useDataGridContext()

	const paginationAndSorting = useSelector(({ dataGrid }) => dataGrid[dataGridKey]?.paginationAndSorting)

	return (
		<Pagination
			count={count}
			pagination={paginationAndSorting}
			updatePagination={(pagination) => dispatch(updatePaginationAndSorting({ [dataGridKey]: pagination }))}
			{...props}
		/>
	)
}

const PaginationMessage = memo(() => {
	const dispatch = useDispatch()

	const { t } = useTranslation("ui", { keyPrefix: "table.pagination.messages" })

	const { count, dataGridKey, selectionPerPage } = useDataGridContext()

	const { selection } = useSelector(({ dataGrid }) => dataGrid[dataGridKey])

	const isEverythingSelected = useMemo(() => selection === "ALL" || selection?.length === count, [count, selection])

	return (
		<div className='text-muted-foreground m-2 flex w-max flex-wrap items-center text-sm'>
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
						onClick={() => dispatch(updateSelection({ [dataGridKey]: isEverythingSelected ? [] : "ALL" }))}
						size='sm'
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

// Exposing Components on DataGrid.FiltersBar: Header and Content from DefaultFiltersBar, and a custom Footer created above (FiltersBarFooter)
FiltersBar.Header = DefaultFiltersBar.Header
FiltersBar.Content = DefaultFiltersBar.Content
FiltersBar.Footer = FiltersBarFooter
DataGrid.FiltersBar = FiltersBar

DataGrid.Content = Content
DataGrid.MultiViewLayout = MultiViewLayout
DataGrid.Body = DataGridBody

DataGrid.TopBar = TopBar

// Exposing PaginationMessage on DataGrid.Pasgination.Message
DataGridPagination.Message = PaginationMessage
DataGrid.Pagination = DataGridPagination

export default DataGrid

const viewsTriggerButtons: {
	icon: React.LazyExoticComponent<IconType>
	key: DataGridView
	title: string
}[] = [
	{ icon: lazy(() => import("~icons/material-symbols/format-list-bulleted-rounded")), key: "LIST", title: "List View" },
	{ icon: lazy(() => import("~icons/teenyicons/grid-layout-solid")), key: "GRID", title: "Grid View" },
]
