export interface ErrorObject {
	data?: {
		message?: string
		statusCode: number
	}
	error?: string
	status?: number | string
}

/**
 * Handles different error types and returns the appropriate error message to display.
 * @param error The error object to handle.
 * @returns The error message to display.
 */
export const getErrorMessage = (error: ErrorObject): string => {
	if (error?.status === 403) return "Forbidden request"

	if (error?.status === 404) return "Resource not found"

	if (error?.status === 500) return "Server Exception error"

	if (error?.status === "FETCH_ERROR") return "Network Error"

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
): { id: string | undefined; type: T }[] {
	return resultsWithIds
		? [{ id: "LIST", type: tagType }, ...resultsWithIds.map((id) => ({ id, type: tagType }))]
		: [{ id: "LIST", type: tagType }]
}

export const transformResponse = <Result extends { data: any }>(res: Result) => res?.data

interface SelectFromResultOptions<TData> {
	data?: {
		count: number
		list: TData[]
	}
	isLoading: boolean
}

export function selectListFromResult<TData>({ data, isLoading, ...rest }: SelectFromResultOptions<TData>) {
	return {
		...data,
		count: data?.count,
		list: data?.list,
		loading: isLoading,
		...rest,
	}
}
