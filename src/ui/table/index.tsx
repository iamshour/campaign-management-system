//#region Import
import { Suspense, isValidElement, lazy, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import Checkbox from "../checkbox/checkbox"
import Skeleton from "../skeleton/skeleton"

import type { RowData, TableProps } from "./types"

const TableColumnHeader = lazy(() => import("./table-column-header"))
//#endregion

const TableCell = ({ className, children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
	<td className={twMerge("h-max min-h-12 border-none p-2 align-middle", className)} {...props}>
		<Suspense fallback={<Skeleton className='h-full min-h-12 w-full rounded-xl' />}>{children}</Suspense>
	</td>
)

const Table = <TData extends RowData>({
	list,
	columns,
	count = 0,
	state: { selection, sort, order },
	updateState,
	updateSelection,
	isFetching = false,
	highlightOnHover = true,
	onRowClick,
	classNames,
}: TableProps<TData>) => {
	const { t } = useTranslation("ui")

	const isSelectable = useMemo(() => columns?.some((col) => col.accessorKey === "selection"), [columns])

	const checkIfRowSelected = useCallback(
		(row: any): boolean => {
			if (selection === undefined) return false

			if (selection === "ALL") return true

			// Get row id selector (if selection is enabled)
			const rowIdSelector = columns.find(({ accessorKey }) => accessorKey === "selection")?.rowIdSelector

			if (!rowIdSelector) return false

			return selection?.includes(row[rowIdSelector as keyof typeof row])
		},
		[columns, selection]
	)

	return (
		<div className={twMerge("relative h-full w-full flex-1 overflow-y-auto", classNames?.wrapper)}>
			<table className={twMerge("w-max min-w-full table-fixed caption-bottom text-sm", classNames?.table)}>
				<thead className={twMerge("sticky top-0 z-10 bg-white shadow-sm", classNames?.thead)}>
					<tr className={twMerge("h-12", classNames?.theadTr)}>
						{columns?.map(({ accessorKey, rowIdSelector, sortable, header }, idx) =>
							accessorKey === "selection" && !!updateSelection ? (
								<th
									className={twMerge(
										"relative w-[60px]",
										(isFetching || !list?.length) && "pointer-events-none",
										classNames?.theadTh
									)}
									key='checkbox-th-cell'>
									<Checkbox
										className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '
										checked={selection === "ALL" || (!!list?.length && list?.length === selection?.length)}
										onCheckedChange={() => updateSelection(list?.map((row) => row[rowIdSelector as keyof typeof row]))}
									/>
								</th>
							) : accessorKey === "actions" ? (
								<th key={idx + String(accessorKey)} className={twMerge("!w-[80px]", classNames?.theadTh)} />
							) : (
								<th
									className={twMerge(
										"w-max border-b-0 py-1 pe-8 [&>button]:-ms-0.5 [&>h2]:-ms-0.5",
										classNames?.theadTh
									)}
									key={idx + String(accessorKey)}>
									<Suspense fallback={<Skeleton className='h-8 w-full' />}>
										{!!sortable && typeof header === "string" ? (
											<TableColumnHeader
												order={order}
												prevSort={sort as keyof (TData | undefined)}
												newSort={accessorKey as keyof (TData | undefined)}
												onSort={({ sort, order }) => updateState({ sort, order })}>
												{t(header)}
											</TableColumnHeader>
										) : typeof header === "string" ? (
											<h2 className='w-full whitespace-nowrap ps-2 text-start text-sm font-medium text-black'>
												{t(header)?.toLocaleUpperCase()}
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
								colSpan={columns.length}
								className={twMerge("h-[calc(100vh-260px)]", classNames?.emptyTableCell)}>
								<h2 className='text-center text-2xl font-light uppercase tracking-widest text-gray-500'>
									{t("noResultsComponent")}
								</h2>
							</TableCell>
						</tr>
					) : (
						list?.map((row, index) => (
							<tr
								data-selected={isSelectable ? checkIfRowSelected(row) : undefined}
								key={index}
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
								)}>
								{columns.map(({ accessorKey, rowIdSelector, preventCellClick, cell }, idx) =>
									accessorKey === "selection" && !!updateSelection ? (
										<TableCell key='checkbox-td-cell' className={twMerge("relative", classNames?.tbodyTd)}>
											<Checkbox
												className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
												checked={selection === "ALL" || selection?.includes(row[rowIdSelector as keyof typeof row])}
												onCheckedChange={() => updateSelection(row[rowIdSelector as keyof typeof row])}
											/>
										</TableCell>
									) : accessorKey === "actions" && !!cell ? (
										<TableCell
											key={`actions-row-${idx}`}
											className={twMerge("[&>button]:[float:inline-end]", classNames?.tbodyTd)}>
											{cell(row["actions"], row)}
										</TableCell>
									) : (
										<TableCell
											key={idx}
											onClick={() => !!onRowClick && !preventCellClick && onRowClick(row)}
											className={twMerge(
												"min-w-[120px] max-w-[200px] overflow-hidden truncate text-sm text-[#4B4B4B]",
												classNames?.tbodyTd
											)}>
											{cell ? cell(row[accessorKey], row) : row[accessorKey]}
										</TableCell>
									)
								)}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Table
