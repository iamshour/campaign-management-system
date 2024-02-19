/**
 * Used to increment a number at the end of a string
 * @param string - String to be checked
 * @returns New updated string with an incremented number at the end
 */
const incrementNumberSuffix = (s: string) => {
	// regular expression to match a space followed by one or more digits at the end of the string
	const spacefollowedByNumberRegex = /(\s\d+)?$/

	return s.replace(spacefollowedByNumberRegex, (match) => {
		if (!match) return " 1"

		const incrementedNumber = parseInt(match.trim(), 10) + 1
		return ` ${incrementedNumber}`
	})
}

export default incrementNumberSuffix
