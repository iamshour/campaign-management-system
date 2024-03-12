//#region Import
import { ChannelSourceListingDisplayStatus } from "@/features/channels/sms-senders/types/data.types"
//#endregion

const smsListingStatusesColorsMap: Record<ChannelSourceListingDisplayStatus, string> = {
	APPROVED: "#28B745",
	BLOCKED: "#EB2344",
	DEACTIVATED: "#B9B9B9",
	NEW: "#2DAEF5",
	PENDING: "#2DAEF5",
	REJECTED: "#F5788C",
	SUSPENDED: "#EB9B23",
}

export default smsListingStatusesColorsMap
