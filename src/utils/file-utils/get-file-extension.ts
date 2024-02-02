/**
 * Gets the extension of a file based on its name.
 * @param name The name of the file.
 * @returns The extension of the file in lowercase, or undefined if the name does not have an extension.
 */
const getFileExtension = (name: File["name"]): string => {
	if (!name) return ""

	// Get the last index of the dot to handle cases where the file name has multiple dots
	const lastDotIndex = name.lastIndexOf(".")

	// No extension found
	if (lastDotIndex === -1) return ""

	const extension = name.substring(lastDotIndex + 1).toLowerCase()
	return extension
}

export default getFileExtension
