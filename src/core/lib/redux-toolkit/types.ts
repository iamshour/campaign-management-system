export type SortDirection = "asc" | "desc" | null

export interface GetListReturnType<T> {
	/**
	 * Count of fetched entries
	 */
	count: number

	/**
	 * List of entries fetched
	 */
	list: T[]
}

/**
 * Base Arguments used to when fetching for list of entries
 */
export type PaginationAndSorting<TData> = {
	/**
	 * Limit of entries to be fetched by server. Common values are: 25, 50, 75, and 100
	 */
	limit: number

	/**
	 * Number to slice data from, used by server
	 */
	offset: number

	/**
	 * Order for the sort, could be ASC, DESC, or undefined
	 */
	order?: SortDirection

	/**
	 * A key of the passed Data used for sorting
	 */
	sort?: keyof TData
}
