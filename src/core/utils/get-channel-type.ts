//#region Import
import type { Pathname } from "react-router-dom"
//#endregion

type ChannelType = {
	name: "sms"
	type?: "international" | "local"
}

/**
 * Quick utility function used to get channel name and type from URL pathname
 * @param pathname URL Pathname passed
 * @returns Channel Type Object
 */
function getChannelType(pathname: Pathname): ChannelType | null {
	const matchedPaths = pathname.match(/channels\/([^/]+)/)

	if (matchedPaths && matchedPaths[1]) {
		const channel = matchedPaths[1]?.split("-")

		// Splitting returned channel type from url
		// If channel type in URL is: "local-sms", then returned value is { name: "sms", type: "local" }
		// If channel type doesn't have "local" or "internaltion", like for ex. "whatsapp", then return value is { name: "whatsapp" }
		// Since we're safely assigning first index of array after split as channel name if type doesn't exist
		return { name: channel[1] || channel[0], type: channel[0] || undefined } as ChannelType
	}

	return null
}

export default getChannelType
