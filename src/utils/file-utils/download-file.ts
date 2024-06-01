/**
 * Downloads a file with the given file name and data.
 *
 * @param fileName - The name of the file to download.
 * @param data - The data to download, as a Blob or MediaSource.
 */
function downloadFile(fileName: string, data: Blob | MediaSource): void {
	const downloadLink = document.createElement("a")

	downloadLink.download = fileName

	const url = URL.createObjectURL(data)

	downloadLink.href = url

	// Append the download link to the document body for cross-browser compatibility
	document.body.appendChild(downloadLink)

	downloadLink.click()

	// Clean up the URL object to free memory
	URL.revokeObjectURL(url)

	// Removes the download link from the document body
	document.body.removeChild(downloadLink)
}

export default downloadFile
