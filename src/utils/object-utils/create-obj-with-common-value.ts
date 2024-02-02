/**
 * Creates an object with specified keys, each having a common value, and an 'any' key
 * to check if the common value is valid for all keys.
 *
 * @param keys - An array of keys for the object.
 * @param commonValue - The common value to assign to each key.
 * @returns An object with specified keys and the 'any' key.
 *
 * @example
 * ```
 * const keysArray = ["key1", "key2", "key3", "key4", "key5"]
 * const myValue = "yourCommonValue"
 * const myObj = createObjtWithCommonValue(keysArray, myValue)
 * ```
 */
function createObjtWithCommonValue<T>(keys: string[], commonValue: T): Record<string, T | boolean> {
	const obj: Record<string, T | boolean> = {}

	keys.forEach((key) => {
		obj[key] = commonValue
	})

	if (commonValue) {
		obj.any = true
	}

	return obj
}

export default createObjtWithCommonValue
