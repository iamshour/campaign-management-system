//#region Import
import type { ChannelSourceRequestAction } from "../types/data.types"

const smsListingRequestActionsColorsMap: Record<ChannelSourceRequestAction, string> = {
	APPROVE: "#28B745",
	BLOCK: "#EB2344",
	REJECT: "#F5788C",
}

export default smsListingRequestActionsColorsMap
