//#region Import
import { Suspense, createContext, lazy, useCallback, useContext, useEffect } from "react"
import { useTranslation } from "react-i18next"

import DefaultFiltersBar from "@/core/components/filters-bar"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import {
	clearFilters,
	clearSelection,
	updateAdvancedTableState,
	updateSelection,
} from "@/core/slices/advanced-table-slice/advanced-table-slice"
import {
	Button,
	Skeleton,
	Table,
	TableSkeleton,
	twMerge,
	type TablePaginationProps,
	type RowData,
	type TableProps,
} from "@/ui"

import type { TableKey } from "../slices/advanced-table-slice/types"

const SearchInput = lazy(() => import("@/ui").then((mod) => ({ default: mod.SearchInput })))
const TablePagination = lazy(() => import("@/ui").then((mod) => ({ default: mod.TablePagination })))
//#endregion

type AdvancedTableContextValue = { tableKey: TableKey; count: number }
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

function TableContent<TData extends RowData>(
	props: Omit<TableProps<TData>, "count" | "state" | "updateState" | "updateSelection">
) {
	const dispatch = useDispatch()

	const { tableKey, count } = useAdvancedTableContext()

	const { offset, limit, sort, order, selection } = useSelector(({ advancedTable }) => advancedTable[tableKey])

	return (
		<Suspense fallback={<TableSkeleton colsLength={props?.columns?.length} className='mb-4 flex-1 px-0' />}>
			<Table<TData>
				count={count}
				state={{ offset, limit, sort, order, selection }}
				updateState={(tableState) => dispatch(updateAdvancedTableState({ [tableKey]: tableState }))}
				updateSelection={(selection) => dispatch(updateSelection({ [tableKey]: selection }))}
				highlightOnHover
				{...props}
			/>
		</Suspense>
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
AdvancedTable.TopBar = TopBar
AdvancedTable.Table = TableContent

// Exposing PaginationMessage on AdvancedTable.Pasgination.Message
AdvancedTablePagination.Message = PaginationMessage
AdvancedTable.Pagination = AdvancedTablePagination

export default AdvancedTable
