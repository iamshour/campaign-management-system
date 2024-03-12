//#region Import
import type { ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"
//#endregion

const smsListingStatusesLocaleMap: Record<"DEACTIVATED" | "PENDING" | ChannelSourceListingStatus, string> = {
	APPROVED: "channels-common:listingStatuses.approved",
	BLOCKED: "channels-common:listingStatuses.blocked",
	DEACTIVATED: "channels-common:listingStatuses.deactivated",
	NEW: "channels-common:listingStatuses.new",
	PENDING: "channels-common:listingStatuses.pending",

	REJECTED: "channels-common:listingStatuses.rejected",
	SUSPENDED: "channels-common:listingStatuses.suspended",
}

export default smsListingStatusesLocaleMap
