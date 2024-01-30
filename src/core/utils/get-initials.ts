/**
 * @description Simple utility function to get initials of a user
 * @param name Full user's name
 * @returns Initials of user's name
 */
const getInitials = (name: string, options?: { uppercase?: boolean }) => {
	if (!name) return options?.uppercase ? "NA" : ""

	const initials = name
		.trim()
		.split(/[\s-]+/)
		.map((part) => {
			const initial = part[0]
			return options?.uppercase ? initial.toUpperCase() : initial
		})
		.join("")

	return initials
}

export default getInitials
