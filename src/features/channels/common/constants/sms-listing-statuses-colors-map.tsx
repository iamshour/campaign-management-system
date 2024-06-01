//#region Import
import type { ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"
//#endregion

const smsListingStatusesColorsMap: Record<ChannelSourceListingStatus, string> = {
	APPROVED: "#28B745",
	BLOCKED: "#EB2344",
	NEW: "#2DAEF5",
	REJECTED: "#F5788C",
	SUSPENDED: "#EB9B23",
}

export default smsListingStatusesColorsMap
