//#region Import
import type { ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"
//#endregion

const smsListingStatusesLocaleMap: Record<ChannelSourceListingStatus, string> = {
	APPROVED: "channels-common:listingStatuses.approved",
	BLOCKED: "channels-common:listingStatuses.blocked",
	NEW: "channels-common:listingStatuses.new",
	REJECTED: "channels-common:listingStatuses.rejected",
	SUSPENDED: "channels-common:listingStatuses.suspended",
}

export default smsListingStatusesLocaleMap
