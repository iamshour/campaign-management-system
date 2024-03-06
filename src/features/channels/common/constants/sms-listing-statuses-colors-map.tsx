//#region Import
import type { SmsListingStatus } from "@/features/channels/common/types"
//#endregion

const smsListingStatusesColorsMap: Record<SmsListingStatus, string> = {
	APPROVED: "#28B745",
	BLOCKED: "#EB2344",
	DEACTIVATED: "#B9B9B9",
	PENDING: "#2DAEF5",
	REJECTED: "#F5788C",
	SUSPENDED: "#EB9B23",
}

export default smsListingStatusesColorsMap
