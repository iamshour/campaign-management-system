//#region Import
import { Suspense, createContext, lazy, useCallback, useContext, useEffect } from "react"
import { useTranslation } from "react-i18next"

import DefaultFiltersBar from "@/core/components/filters-bar"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import {
	clearFilters,
	clearSelection,
	toggleListGridView,
	updateAdvancedTableState,
	updateSelection,
} from "@/core/slices/advanced-table-slice/advanced-table-slice"
import { Button, DataGridSkeleton, Skeleton, Table, TableSkeleton, Tooltip, twMerge } from "@/ui"
import type { TablePaginationProps, RowData, TableProps, IconType } from "@/ui"

import type { AdvancedTableListGridView, TableKey } from "../slices/advanced-table-slice/types"

const SearchInput = lazy(() => import("@/ui/input/search-Input"))
const TablePagination = lazy(() => import("@/ui/table/table-pagination"))
//#endregion

type AdvancedTableContextValue = Required<Pick<AdvancedTableProps, "tableKey" | "count">>
const AdvancedTableContext = createContext({} as AdvancedTableContextValue)

// eslint-disable-next-line
export const useAdvancedTableContext = (): AdvancedTableContextValue => useContext(AdvancedTableContext)

interface AdvancedTableProps extends React.HTMLAttributes<HTMLDivElement> {
	tableKey: TableKey
	count: number
}

const AdvancedTable = ({ className, tableKey, count, ...props }: AdvancedTableProps) => {
	const dispatch = useDispatch()

	useEffect(() => {
		return () => {
			dispatch(clearSelection(tableKey))
		}
	}, [dispatch, tableKey])

	return (
		<AdvancedTableContext.Provider value={{ tableKey, count }}>
			<div className={twMerge("flex h-full w-full flex-1 overflow-hidden", className)} {...props} />
		</AdvancedTableContext.Provider>
	)
}

const FiltersBar = (props: React.ComponentPropsWithoutRef<typeof DefaultFiltersBar>) => <DefaultFiltersBar {...props} />

const FiltersBarFooter = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation("common", { keyPrefix: "filters-bar" })

	const { tableKey } = useAdvancedTableContext()

	return (
		<footer className='p-3 shadow-inner'>
			<Button
				className='h-max w-full py-2 text-lg text-primary-600'
				variant='ghost'
				size='lg'
				onClick={() => dispatch(clearFilters(tableKey))}>
				{t("actions.clear-all")}
			</Button>
		</footer>
	)
}

const Content = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={twMerge("flex h-full w-[calc(100%-300px)] max-w-full flex-1 flex-col px-4", className)} {...props} />
)

type TopBarProps = { withFilters?: boolean; children?: React.ReactNode }
const TopBar = ({ withFilters = true, children }: TopBarProps) => {
	const dispatch = useDispatch()

	const { tableKey } = useAdvancedTableContext()

	const { appliedFiltersCount } = useSelector(({ advancedTable }) => advancedTable[tableKey])

	const onSearchChange = useCallback(
		(searchTerm?: string) => {
			dispatch(updateAdvancedTableState({ [tableKey]: { searchTerm } }))
		},
		[dispatch, tableKey]
	)

	return (
		<Suspense fallback={<HorizontalSkeleton />}>
			<div className='flex w-full items-center justify-between gap-2 py-4'>
				<div className='flex gap-2'>
					{withFilters && <DefaultFiltersBar.Trigger appliedFiltersCount={appliedFiltersCount} />}

					<SearchInput onChange={onSearchChange} className='max-w-[14rem] md:max-w-[18rem]' />
				</div>
				{children}
			</div>
		</Suspense>
	)
}

type TableBodyProps<TData extends RowData> = Pick<
	TableProps<TData>,
	"list" | "columns" | "classNames" | "highlightOnHover" | "isFetching" | "onRowClick"
> & {
	GridCard?: (props: TData) => JSX.Element
	gridClassName?: string
}

const TableBody = <TData extends RowData>({ list, GridCard, gridClassName, ...props }: TableBodyProps<TData>) => {
	const { t } = useTranslation("ui")
	const dispatch = useDispatch()

	const { tableKey, count } = useAdvancedTableContext()
	const { view, offset, limit, sort, order, selection } = useSelector(({ advancedTable }) => advancedTable[tableKey])

	return view === "GRID" ? (
		<Suspense fallback={<DataGridSkeleton />}>
			{!list?.length ? (
				<div className='h-full w-full p-4 flex-center'>
					<h2 className='text-center text-2xl font-light uppercase tracking-widest text-gray-500'>
						{t("table.message.noResults")}
					</h2>
				</div>
			) : (
				<div className={twMerge("grid max-w-full flex-1 justify-evenly gap-6 overflow-y-auto p-4", gridClassName)}>
					{!GridCard ? (
						<>Please pass a Grid Card to render Grid view properly</>
					) : (
						list.map((item, idx) => <GridCard key={idx} {...item} />)
					)}
				</div>
			)}
		</Suspense>
	) : (
		<>
			<Suspense fallback={<TableSkeleton colsLength={props?.columns?.length} className='mb-4 flex-1 px-0' />}>
				<Table<TData>
					list={list}
					count={count}
					state={{ offset, limit, sort, order, selection }}
					updateState={(tableState) => dispatch(updateAdvancedTableState({ [tableKey]: tableState }))}
					updateSelection={(selection) => dispatch(updateSelection({ [tableKey]: selection }))}
					{...props}
				/>
			</Suspense>
		</>
	)
}

const MultiViewLayout = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch()

	const { tableKey } = useAdvancedTableContext()
	const { view } = useSelector(({ advancedTable }) => advancedTable[tableKey])

	return (
		<div className='flex h-full w-full flex-col overflow-hidden'>
			<div className='mb-4 inline-flex w-max gap-2.5 place-self-end'>
				{viewsTriggerButtons.map(({ key, title, icon: Icon }) => (
					<Tooltip key={key}>
						<Tooltip.Trigger asChild>
							<Button
								active={key === view}
								variant='outline-secondary'
								className='flex h-[40px] w-[40px] rounded-md'
								onClick={() => dispatch(toggleListGridView({ [tableKey]: key }))}>
								<Icon className='text-lg' />
								<p className='sr-only'>{title}</p>
							</Button>
						</Tooltip.Trigger>

						<Tooltip.Content side='bottom' align='end' sideOffset={8} content={title} />
					</Tooltip>
				))}
			</div>

			{children}
		</div>
	)
}

const AdvancedTablePagination = (props: Pick<TablePaginationProps, "children" | "pageLimits">) => {
	const dispatch = useDispatch()

	const { tableKey, count } = useAdvancedTableContext()

	const { offset, limit } = useSelector(({ advancedTable }) => advancedTable[tableKey])

	return (
		<Suspense fallback={<HorizontalSkeleton />}>
			<TablePagination
				pagination={{ offset, limit }}
				count={count}
				updatePagination={(pagination: TablePaginationProps["pagination"]) =>
					dispatch(updateAdvancedTableState({ [tableKey]: pagination }))
				}
				{...props}
			/>
		</Suspense>
	)
}

const PaginationMessage = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation("contacts")

	const { tableKey, count } = useAdvancedTableContext()

	const { limit, selection } = useSelector(({ advancedTable }) => advancedTable[tableKey])

	return (
		<div className='text-muted-foreground inline-flex flex-1 flex-wrap items-center gap-2 text-sm'>
			{t("table.pagination.initial-message", {
				selectionLength: selection === "ALL" ? count : selection?.length ? selection?.length : 0,
				totalLength: count,
			})}

			{count > limit && (selection === "ALL" || (!!selection?.length && selection?.length === limit)) && (
				<div className='inline-flex flex-wrap items-center gap-2'>
					<span className='font-semibold'>
						{selection === "ALL"
							? t("table.pagination.everything-already-selected-message")
							: t("table.pagination.select-everything-prompt")}
					</span>

					<Button
						size='sm'
						variant={selection === "ALL" ? "outline" : "secondary"}
						className='h-max max-h-[32px] py-1.5'
						onClick={() =>
							dispatch(updateAdvancedTableState({ [tableKey]: { selection: selection === "ALL" ? [] : "ALL" } }))
						}>
						{selection === "ALL"
							? t("table.pagination.clear-all-button")
							: t("table.pagination.select-all-button", { count })}
					</Button>
				</div>
			)}
		</div>
	)
}

const HorizontalSkeleton = () => (
	<div className='h-[72px] p-4'>
		<Skeleton className='h-full' />
	</div>
)

// Exposing Components on AdvancedTable.FiltersBar: Header and Content from DefaultFiltersBar, and a custom Footer created above (FiltersBarFooter)
FiltersBar.Header = DefaultFiltersBar.Header
FiltersBar.Content = DefaultFiltersBar.Content
FiltersBar.Footer = FiltersBarFooter
AdvancedTable.FiltersBar = FiltersBar

AdvancedTable.Content = Content
AdvancedTable.MultiViewLayout = MultiViewLayout
AdvancedTable.Body = TableBody

AdvancedTable.TopBar = TopBar

// Exposing PaginationMessage on AdvancedTable.Pasgination.Message
AdvancedTablePagination.Message = PaginationMessage
AdvancedTable.Pagination = AdvancedTablePagination

export default AdvancedTable

const viewsTriggerButtons: {
	key: AdvancedTableListGridView
	title: string
	icon: React.LazyExoticComponent<IconType>
}[] = [
	{ key: "LIST", title: "List View", icon: lazy(() => import("~icons/material-symbols/format-list-bulleted-rounded")) },
	{ key: "GRID", title: "Grid View", icon: lazy(() => import("~icons/teenyicons/grid-layout-solid")) },
]
