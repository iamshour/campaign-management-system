/**
 * Safely retrieves the value associated with the specified key from an object,
 * only if the object is completely valid, with the passed key and other keys
 * have valid values, else it returns undefined
 *
 * @template T - The type of the object.
 * @param {K} key - The key for which to retrieve the value.
 * @param {T} obj - The object from which to retrieve the value.
 * @returns {T[K] | undefined} The value associated with the specified key, or undefined if the object or key is invalid.
 */
function getValueFromSafeObject<T extends Record<string, any>>(key: keyof T, passedObject?: T) {
	if (!passedObject || Object.values(passedObject)?.some((value) => value === undefined)) return

	return passedObject[key]
}

export default getValueFromSafeObject
