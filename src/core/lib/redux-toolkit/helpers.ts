export interface ErrorData {
	message?: string
	[key: string]: any
}
export interface ErrorObject {
	error?: string
	status?: number | string
	data?: ErrorData
}

/**
 * Handles different error types and returns the appropriate error message to display.
 * @param error The error object to handle.
 * @returns The error message to display.
 */
export const getErrorMessage = (error: ErrorObject): string => {
	console.log("Error From Get Error Message: ", error)

	if (error?.status === 403) return "Forbidden request."
	if (error?.status === 404) return "Resource not found."
	if (error?.status === 500) return "Server exception error. Please try again, or contact IT for support."
	if (error?.status === "FETCH_ERROR") return "Opps.. Failed to fetch. Seems like a network error"

	if (typeof error?.error === "string") return error.error
	if (error?.data?.message && typeof error.data.message === "string" && error.status !== 500) return error.data.message

	return "Something went wrong..."
}

/**
 * Creates an array of tags to be used in the `providesTags` key of a query in RTK Query.
 *
 * @param resultsWithIds - The array of IDs to generate tags from.
 * @param tagType - The type of the tags.
 * @returns An array of tags.
 * @link https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#abstracting-common-providesinvalidates-usage
 */
export function providesList<R extends string[] | undefined, T extends string>(
	resultsWithIds: R | undefined,
	tagType: T
): { type: T; id: string | undefined }[] {
	return resultsWithIds
		? [{ type: tagType, id: "LIST" }, ...resultsWithIds.map((id) => ({ type: tagType, id }))]
		: [{ type: tagType, id: "LIST" }]
}

export const transformResponse = <Result extends { data: any }>(res: Result) => res?.data

interface SelectFromResultOptions<TData> {
	data?: {
		list: TData[]
		count: number
	}
	isLoading: boolean
}

export function selectListFromResult<TData>({ data, isLoading, ...rest }: SelectFromResultOptions<TData>) {
	return {
		...data,
		list: data?.list,
		count: data?.count,
		loading: isLoading,
		...rest,
	}
}
