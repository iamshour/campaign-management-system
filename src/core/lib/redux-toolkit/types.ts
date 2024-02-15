//#region Import
import type { SortDirection } from "@/ui"
//#endregion

export interface ListDataReturnType<T> {
	list: T[]
	count: number
}

/**
 * Base Arguments used to when fetching for list of entries
 */
export type BaseFetchListArgs<TData> = {
	/**
	 * A key of the passed Data used for sorting
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
	 * Limit of entries to be fetched by server. Common values are: 25, 50, 75, and 100
	 */
	limit: number
}
