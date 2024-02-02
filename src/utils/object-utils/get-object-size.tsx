import isEmpty from "lodash.isempty"

/**
 * Calculate the size of an object based on truthy values.
 *
 * @param obj - The input object to calculate the size.
 * @returns The size of the object based on truthy values.
 */
const getObjectSize = (obj: Record<string, any>): number => {
	if (typeof obj !== "object" || obj === null) return 0

	let size = 0

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key) && !isEmpty(obj[key])) {
			size += 1
		}
	}

	return size
}

export default getObjectSize
