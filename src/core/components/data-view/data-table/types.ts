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

export interface DataTableProps<TData extends RowData> {
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
	 */
	onRowClick?: (rowData: TData) => void
}
