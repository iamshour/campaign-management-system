//#region Import
import { ChannelSourceListingDisplayStatus } from "@/features/channels/sms-senders/types/data.types"
//#endregion

const smsListingStatusesLocaleMap: Record<ChannelSourceListingDisplayStatus, string> = {
	APPROVED: "channels-common:listingStatuses.approved",
	BLOCKED: "channels-common:listingStatuses.blocked",
	DEACTIVATED: "channels-common:listingStatuses.deactivated",
	NEW: "channels-common:listingStatuses.new",
	PENDING: "channels-common:listingStatuses.pending",

	REJECTED: "channels-common:listingStatuses.rejected",
	SUSPENDED: "channels-common:listingStatuses.suspended",
}

export default smsListingStatusesLocaleMap
