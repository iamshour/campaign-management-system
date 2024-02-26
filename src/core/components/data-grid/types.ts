//#region Import
import type { DataGridKey } from "@/core/slices/data-grid-slice/types"
//#endregion

export type SortDirection = "asc" | "desc" | null

export type RowData = Record<string, any>

export type ColumnType<TData, TValue = any> = {
	/**
	 * Callback function that returns a custom node, used to render custom cells
	 * @param value Value for the cell itself, example: for a `firstName` column, value could be Ali
	 * @param rowData Data passed for the whole row (ex. firstName, lastName, age, etc..)
	 * @returns Custom Node to be rendered as a cell
	 */
	cell?: (value: TValue, rowData: TData) => React.ReactNode

	/**
	 * Used to render column's cell, could either be a string, or a node
	 */
	header?: React.ReactNode | string

	/**
	 * Boolean property used to prevent clicking on the cell
	 */
	preventCellClick?: boolean

	/**
	 * Boolean usef to enable column sorting
	 */
	sortable?: boolean
} & (
	| {
			/**
			 * Boolean used to show a checkbox for each row
			 */
			accessorKey: "selection"

			/**
			 * Selector used to identify each row (key), which commnly is the id property in the passed data
			 */
			rowIdSelector: keyof TData
	  }
	| {
			/**
			 * Used to connect a column object with its related key in passed Data object
			 */
			accessorKey: "actions" | keyof TData

			/**
			 * Keyselector used to identify each row (key), which commnly is the id property in the passed data
			 */
			rowIdSelector?: undefined
	  }
)

export type DataGridTableProps<TData extends RowData> = {
	/**
	 * classNames object, used to pass classNames for each element in Table
	 */
	classNames?: Partial<
		Record<
			"emptyTableCell" | "table" | "tbody" | "tbodyTd" | "tbodyTr" | "thead" | "theadTh" | "theadTr" | "wrapper",
			string
		>
	>

	/**
	 * Beeloan used to show a highlight while hovering on rows
	 */
	highlightOnHover?: boolean

	/**
	 * Optional onClick event passed on each table row
	 * @param rowData Row Data passed
	 * @returns void
	 */
	onRowClick?: (rowData: TData) => void
}

export interface DataGridProps<TData> extends Pick<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
	/**
	 * Array of Columns to be rendered
	 */
	columns: ColumnType<TData, any>[]

	/**
	 * Total Number of entries fetched from the server
	 */
	count: number

	dataGridKey: DataGridKey

	/**
	 * Boolean used to show skeleton in each cell when an asynchronous acrion is pending
	 */
	isFetching?: boolean

	/**
	 * Passed data to be used for each column/row
	 */
	list: TData[]
}
