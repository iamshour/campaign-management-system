//#region Import
import { twMerge } from "tailwind-merge"
//#endregion

const CompactTable = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={twMerge("relative h-full w-full flex-1 overflow-auto rounded-md bg-white", className)} {...props}>
		<table className='h-full w-full min-w-max caption-bottom text-sm'>{children}</table>
	</div>
)

const CompactTableHeader = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
	<thead className={twMerge("sticky -top-[0.1px] bg-white shadow-sm [&_tr]:border-b", className)} {...props} />
)

const CompactTableBody = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
	<tbody className={twMerge("[&_tr:last-child]:border-0", className)} {...props} />
)

const CompactTableFooter = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
	<tfoot className={twMerge("bg-slate-900 font-medium text-slate-50", className)} {...props} />
)

const CompactTableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
	<tr
		className={twMerge(
			"border-b transition-colors data-[state=selected]:bg-slate-100 hover:bg-slate-100/50",
			className
		)}
		{...props}
	/>
)

const CompactTableHead = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
	<th
		className={twMerge(
			"h-12 px-4 text-start align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pe-0",
			className
		)}
		{...props}
	/>
)

const CompactTableCell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
	<td className={twMerge("p-4 align-middle [&:has([role=checkbox])]:pe-0", className)} {...props} />
)

const CompactTableCaption = ({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) => (
	<caption className={twMerge("mt-4 text-sm text-slate-500", className)} {...props} />
)

CompactTable.Header = CompactTableHeader
CompactTable.Body = CompactTableBody
CompactTable.Footer = CompactTableFooter
CompactTable.Row = CompactTableRow
CompactTable.Head = CompactTableHead
CompactTable.Cell = CompactTableCell
CompactTable.Caption = CompactTableCaption

export default CompactTable
