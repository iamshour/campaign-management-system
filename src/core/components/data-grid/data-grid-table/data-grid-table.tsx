//#region Import
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { updateSelection } from "@/core/slices/data-grid-slice/data-grid-slice"
import { Checkbox, Skeleton } from "@/ui"
import { isValidElement, lazy, Suspense, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import type { DataGridTableProps, RowData } from "../types"

import { useDataGridContext } from "../data-grid"

const TableColumnHeader = lazy(() => import("./table-column-header"))
//#endregion

const TableCell = ({ children, className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
	<td className={twMerge("h-max min-h-12 border-none p-2 align-middle", className)} {...props}>
		<Suspense fallback={<Skeleton className='h-full min-h-12 w-full rounded-xl' />}>{children}</Suspense>
	</td>
)

const DataGridTable = <TData extends RowData>({
	classNames,
	highlightOnHover = true,
	onRowClick,
}: DataGridTableProps<TData>) => {
	const dispatch = useDispatch()

	const { t } = useTranslation("ui")

	const { columns, count = 0, dataGridKey, isFetching, list } = useDataGridContext<TData>()

	const selection = useSelector(({ dataGrid }) => dataGrid[dataGridKey]?.selection)

	const isSelectable = useMemo(() => columns?.some((col) => col.accessorKey === "selection"), [columns])

	const checkIfRowSelected = useCallback(
		(row: TData): boolean => {
			if (selection === undefined) return false

			if (selection === "ALL") return true

			// Get row id selector (if selection is enabled)
			const rowIdSelector = columns.find(({ accessorKey }) => accessorKey === "selection")?.rowIdSelector

			if (!rowIdSelector) return false

			return selection?.includes(row[rowIdSelector as keyof typeof row])
		},
		[columns, selection]
	)

	const isCheckAllActive = useCallback(
		(rowIdSelector: keyof TData) => list?.every((entry) => selection?.includes(entry[rowIdSelector])),
		[list, selection]
	)

	const onCheckAll = useCallback(
		(rowIdSelector: keyof TData) => {
			const currentListIds = list?.map((row) => row[rowIdSelector]) as string[]

			if (!count) return

			let newSelection: string[] = []

			if (!selection?.length) {
				// Initially Selecting All Page rows...
				newSelection = currentListIds
			} else if (selection === "ALL") {
				// Clearing all selections because `selection === ALL`
				newSelection = []
			} else if (isCheckAllActive(rowIdSelector)) {
				// Clearing Page selections only
				newSelection = selection?.filter((id) => !currentListIds?.includes(id))
			} else {
				// Adding newly page selections if check All Checkbox is not active...
				newSelection = Array.from(new Set([...selection, ...currentListIds]))
			}

			dispatch(updateSelection({ [dataGridKey]: newSelection }))
		},
		[count, isCheckAllActive, dataGridKey, dispatch, list, selection]
	)

	const onCheckItem = useCallback(
		(rowId: string) => {
			if (!rowId) return

			let updatedSelection

			if (!selection?.length || selection === "ALL") {
				updatedSelection = [rowId]
			} else if (selection?.includes(rowId)) {
				updatedSelection = selection?.filter((id) => id !== rowId)
			} else {
				updatedSelection = [...selection, rowId]
			}

			dispatch(updateSelection({ [dataGridKey]: updatedSelection }))
		},
		[selection, dataGridKey, dispatch]
	)

	return (
		<div className={twMerge("relative h-full w-full flex-1 overflow-y-auto", classNames?.wrapper)}>
			<table className={twMerge("w-max min-w-full table-fixed caption-bottom text-sm", classNames?.table)}>
				<thead className={twMerge("sticky top-0 z-10 bg-white shadow-sm", classNames?.thead)}>
					<tr className={twMerge("h-12", classNames?.theadTr)}>
						{columns?.map(({ accessorKey, header, rowIdSelector, sortable }, idx) =>
							accessorKey === "selection" && !!rowIdSelector ? (
								<th
									className={twMerge(
										"relative w-[60px]",
										(isFetching || !list?.length) && "pointer-events-none",
										classNames?.theadTh
									)}
									key='checkbox-th-cell'>
									<Checkbox
										checked={selection === "ALL" || (!!selection?.length && isCheckAllActive(rowIdSelector))}
										className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '
										onCheckedChange={() => onCheckAll(rowIdSelector)}
									/>
								</th>
							) : accessorKey === "actions" ? (
								<th className={twMerge("!w-[80px]", classNames?.theadTh)} key={idx + String(accessorKey)} />
							) : (
								<th
									className={twMerge(
										"w-max border-b-0 py-1 pe-8 [&>button]:-ms-0.5 [&>h2]:-ms-0.5",
										classNames?.theadTh
									)}
									key={idx + String(accessorKey)}>
									<Suspense fallback={<Skeleton className='h-8 w-full' />}>
										{!!sortable && typeof header === "string" ? (
											<TableColumnHeader newSort={accessorKey as keyof (TData | undefined)}>
												{t(header)}
											</TableColumnHeader>
										) : typeof header === "string" ? (
											<h2 className='w-full whitespace-nowrap ps-2 text-start text-sm font-medium text-black'>
												{(t(header) as string)?.toLocaleUpperCase()}
											</h2>
										) : isValidElement(header) ? (
											header
										) : null}
									</Suspense>
								</th>
							)
						)}
					</tr>
				</thead>

				<tbody className={classNames?.tbody}>
					{!count && !list?.length ? (
						<tr className={classNames?.tbodyTr}>
							<TableCell
								className={twMerge("h-[calc(100vh-260px)]", classNames?.emptyTableCell)}
								colSpan={columns.length}>
								<h2 className='text-center text-2xl font-light uppercase tracking-widest text-gray-500'>
									{t("noResultsComponent")}
								</h2>
							</TableCell>
						</tr>
					) : (
						list?.map((row, index) => (
							<tr
								className={twMerge(
									"h-12 border-y border-y-gray-100 bg-white transition-basic data-[selected=true]:bg-primary-100/60",
									// Shows a hilghlight when hovering, only when highlightOnHover === TRUE
									highlightOnHover && "hover:bg-primary-50/60",
									// Shows Cursor when hovering only when highlightOnHover === TRUE and onRowClick function was passed
									highlightOnHover && !!onRowClick && "cursor-pointer",
									// Graying out content if isFetchnig is true
									isFetching && "pointer-events-none opacity-50",
									classNames?.tbodyTr

									// "!h-40"
								)}
								data-selected={isSelectable ? checkIfRowSelected(row) : undefined}
								key={index}>
								{columns.map(({ accessorKey, cell, preventCellClick, rowIdSelector }, idx) => {
									if (accessorKey === "selection" && !!rowIdSelector)
										return (
											<TableCell className={twMerge("relative", classNames?.tbodyTd)} key='checkbox-td-cell'>
												<Checkbox
													checked={selection === "ALL" || selection?.includes(row[rowIdSelector])}
													className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
													onCheckedChange={() => onCheckItem(row[rowIdSelector])}
												/>
											</TableCell>
										)

									if (accessorKey === "actions" && !!cell)
										return (
											<TableCell
												className={twMerge("[&>button]:[float:inline-end]", classNames?.tbodyTd)}
												key={`actions-row-${idx}`}>
												{cell(row["actions"], row)}
											</TableCell>
										)

									return (
										<TableCell
											className={twMerge(
												"min-w-[120px] max-w-[200px] overflow-hidden truncate text-sm text-[#4B4B4B]",
												classNames?.tbodyTd
											)}
											key={idx}
											onClick={() => !!onRowClick && !preventCellClick && onRowClick(row)}>
											{cell ? cell!(row[accessorKey], row) : row[accessorKey]}
										</TableCell>
									)
								})}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	)
}

export default DataGridTable
