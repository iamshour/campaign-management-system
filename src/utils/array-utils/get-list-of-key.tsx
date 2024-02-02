/**
 * Utility function to get a specific key from list of objects,
 * And returns a new list of these keys
 *
 * @param list Passed List to get keys from
 * @param key Key of list to be returned from
 * @returns
 */
function getListOfKey<T extends Record<string, any>>(list: T[] | undefined, key: keyof T) {
	if (!list || !list?.length) return

	return list.map((option) => option[key])
}

export default getListOfKey
