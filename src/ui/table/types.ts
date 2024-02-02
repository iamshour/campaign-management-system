export type SortDirection = "asc" | "desc" | null

export type RowData = Record<string, any>

export type ColumnType<TData, TValue = any> = {
	/**
	 * Used to render column's cell, could either be a string, or a node
	 */
	header?: string | React.ReactNode

	/**
	 * Callback function that returns a custom node, used to render custom cells
	 * @param value Value for the cell itself, example: for a `firstName` column, value could be Ali
	 * @param rowData Data passed for the whole row (ex. firstName, lastName, age, etc..)
	 * @returns Custom Node to be rendered as a cell
	 */
	cell?: (value: TValue, rowData: TData) => React.ReactNode

	/**
	 * Boolean usef to enable column sorting
	 */
	sortable?: boolean

	/**
	 * Boolean property used to prevent clicking on the cell
	 */
	preventCellClick?: boolean
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
			accessorKey: keyof TData | "actions"

			/**
			 * Keyselector used to identify each row (key), which commnly is the id property in the passed data
			 */
			rowIdSelector?: undefined
	  }
)

export interface TableState<TData> {
	/**
	 * A key of the passed Data, used for sorting the column
	 */
	sort?: keyof TData

	/**
	 * Order for the sort, could be ASC, DESC, or undefined
	 */
	order?: SortDirection

	/**
	 * Number to slice data from, used by server
	 */
	offset: number

	/**
	 * Limit of entries to be shown in the table, used by server. Common values are: 25, 50, 75, and 100
	 */
	limit: number

	/**
	 * List of selected entries (ids) to be sent to server for various actions
	 */
	selection?: string[] | "ALL"
}

export type TableProps<TData> = {
	/**
	 * Passed data to be used for each column/row
	 */
	list: TData[]

	/**
	 * Array of Columns to be rendered
	 */
	columns: ColumnType<TData, any>[]

	/**
	 * Total Number of entries fetched from the server
	 */
	count: number

	/**
	 * Commonly used table state (sort, order, offset, limit, selection)
	 */
	state: TableState<TData>

	/**
	 * Callback function used to update Table's state (sort, order, offset, limit, selection)
	 */
	updateState: (updatedState: Partial<TableState<TData>>) => void

	/**
	 * Callback function used to selection
	 */
	updateSelection?: (selection: TableState<TData>["selection"]) => void

	/**
	 * Boolean used to show skeleton in each cell when an asynchronous acrion is pending
	 */
	isFetching?: boolean

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

	/**
	 * classNames object, used to pass classNames for each element in Table
	 */
	classNames?: Partial<
		Record<"wrapper" | "table" | "thead" | "theadTr" | "theadTh" | "tbody" | "tbodyTr" | "tbodyTd", string>
	>
}
