//#region Import
import { useLocation } from "react-router-dom"

import getChannelType from "../utils/get-channel-type"
//#endregion

const useGetChannelType = () => {
	const { pathname } = useLocation()

	const channel = getChannelType(pathname)

	if (!channel?.channelName || !channel?.channelType) throw new Error("Channel Could not be found!")

	// Returning channel, as well as pathname, since pathname is used sometimes whilst getting channel type
	return { ...channel, pathname }
}

export default useGetChannelType
