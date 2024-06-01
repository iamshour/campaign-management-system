/**
 * Simple Utility function used to convert a Base64 image to PNG
 * @param base64Image Passed Base64 image to convert
 * @returns PNG image as a Blob
 */
const convertBase64ToPng = (base64Image: string) => {
	const byteCharacters = atob(base64Image)

	const byteArrays = []

	for (let offset = 0; offset < byteCharacters.length; offset += 512) {
		const slice = byteCharacters.slice(offset, offset + 512)

		const byteNumbers = new Array(slice.length)

		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i)
		}

		const byteArray = new Uint8Array(byteNumbers)

		byteArrays.push(byteArray)
	}

	return new Blob(byteArrays, { type: "image/png" })
}

export default convertBase64ToPng
