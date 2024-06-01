/**
 * Formats a given number of bytes into a human-readable format.
 * @param bytes The number of bytes to format.
 * @param decimals The number of decimal places to include in the formatted string (default: 2).
 * @returns A formatted string representing the number of bytes in human-readable format (e.g. "1.5 MB").
 */
const formatBytes = (bytes: number, decimals = 2): string => {
	if (bytes === 0) return "0 Bytes"

	// Setting base value to 1024
	const k = 1024

	const dm = decimals < 0 ? 0 : decimals

	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

	// exponent of the unit size
	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export default formatBytes
