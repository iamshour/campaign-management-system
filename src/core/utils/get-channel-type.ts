//#region Import
import type { ChannelType } from "@/features/channels/common/types/data.types"
import type { Pathname } from "react-router-dom"
//#endregion

export type ChannelOrigin = "international" | "local" | undefined

type ChannelTypeData = {
	channelName: "sms"
	channelOrigin: ChannelOrigin
	channelType: ChannelType
	channelTypeInUrl: "international-sms" | "local-sms"
}

/**
 * Quick utility function used to get channel name and type from URL pathname
 * @param pathname URL Pathname passed
 * @returns Channel Type Object
 */
function getChannelType(pathname: Pathname): ChannelTypeData | null {
	const matchedPaths = pathname.match(/channels\/([^/]+)/)

	if (matchedPaths && matchedPaths[1]) {
		const channelTypeInUrl = matchedPaths[1] as ChannelTypeData["channelTypeInUrl"]

		const channelNameAndOrigin = channelTypeInUrl?.split("-") as [
			ChannelTypeData["channelOrigin"],
			ChannelTypeData["channelName"],
		]

		// Channel type used to be sent to the server
		const channelType: ChannelType | undefined =
			channelTypeInUrl === "local-sms"
				? "SMS_LOCAL"
				: channelTypeInUrl === "international-sms"
					? "SMS_INTERNATIONAL"
					: undefined

		// Splitting returned channel type from url
		// If channel type in URL is: "local-sms", then returned value is { name: "sms", type: "local" }
		// If channel type doesn't have "local" or "internaltion", like for ex. "whatsapp", then return value is { name: "whatsapp" }
		// Since we're safely assigning first index of array after split as channel name if type doesn't exist
		return {
			channelName: channelNameAndOrigin[1] || channelNameAndOrigin[0],
			channelOrigin: channelNameAndOrigin[0] || undefined,
			channelType,
			channelTypeInUrl,
		} as ChannelTypeData
	}

	return null
}

export default getChannelType
