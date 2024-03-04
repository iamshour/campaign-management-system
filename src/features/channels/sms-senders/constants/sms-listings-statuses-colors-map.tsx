import type { SmsListingStatus } from "@/features/channels/common/types"

const smsListingsStatusesColorsMap: Record<SmsListingStatus, string> = {
	Approved: "#28B745",
	Blocked: "#EB2344",
	Deactivated: "#B9B9B9",
	Pending: "#2DAEF5",
	Rejected: "#F5788C",
	Suspended: "#EB9B23",
}

export default smsListingsStatusesColorsMap
