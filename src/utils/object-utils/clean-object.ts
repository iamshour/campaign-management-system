type CleanObject<T> = T extends object
	? {
			[K in keyof T]-?: T[K] extends (infer U)[] ? CleanObject<U>[] : T[K] extends object ? CleanObject<T[K]> : T[K]
		}
	: T

export default function cleanObject<T extends Record<string, any>>(entry: T): CleanObject<T> {
	const newObj = {} as CleanObject<T>

	Object.keys(entry).forEach((key) => {
		const value = entry[key]

		if (value !== null && value !== undefined) {
			if (typeof value === "object" && !Array.isArray(value)) {
				const cleanedNestedObject = cleanObject(value)
				if (Object.keys(cleanedNestedObject).length > 0) {
					newObj[key as keyof typeof newObj] = cleanedNestedObject
				}
			} else if (Array.isArray(value) && value.length > 0) {
				const cleanedArray = value.map((item) =>
					typeof item === "object" && !Array.isArray(item) ? cleanObject(item) : item
				)
				newObj[key as keyof typeof newObj] = cleanedArray as CleanObject<T[typeof key]>
			} else if (value !== "") {
				newObj[key as keyof typeof newObj] = value as CleanObject<T[typeof key]>
			}
		}
	})

	return newObj
}
