/**
 * An object to be checked if it has falsey values.
 *
 * @param obj - Passed object to be checked if it has fasley/nullish values
 * @returns Boolean, whether the passed object has falsey values or not
 */
const objHasFalseyValues = (obj?: Record<string, any>): boolean => {
	if (typeof obj !== "object" || obj === null || !obj) return true

	for (const key in obj) {
		if (!obj[key]) return true
	}

	return false
}

export default objHasFalseyValues
