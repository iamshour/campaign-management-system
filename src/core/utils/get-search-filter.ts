/**
 * Returns search filter object where each key is one of the entries in the provided list of strings
 * and each value for each key is the same string passed as the common value (`searchTerm` value).
 *
 * @template K - The type of the array containing fields (fields to be searched for).
 * @template T - The type of the common value (`searchTerm`).
 *
 * @param {T} searchTerm - A single string value to be assigned to all keys.
 * @param {K} fields - An array containing fields of type `string`.
 *
 * @returns {undefined | ({ [P in K[number]]: T } & { any: true })} Undefiend, or an object where each key is one of the entries in `fields`
 * and each value is `searchTerm`, in addition to { any: true }
 *
 * @example
 * // Returns { field1: 'searchTerm', field2: 'searchTerm', field3: 'searchTerm', any: true }
 * const result = getSearchFilter("searchTerm", ["field1", "field2", "field3"]);
 */
export function getSearchFilter<K extends string[] = string[], T extends string = string>(
	searchTerm: T | undefined,
	fields: K
): (Record<K[number], T> & { any: true }) | undefined {
	if (!searchTerm) return

	const searchFilterObject: Record<K[number], T> = {} as Record<K[number], T>

	fields.forEach((key) => {
		searchFilterObject[key as keyof typeof searchFilterObject] = searchTerm
	})

	return { ...searchFilterObject, any: true }
}

export default getSearchFilter
