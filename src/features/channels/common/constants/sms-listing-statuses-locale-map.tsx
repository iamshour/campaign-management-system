//#region Import
import type { SmsListingStatus } from "@/features/channels/common/types"
//#endregion

const smsListingStatusesLocaleMap: Record<SmsListingStatus, string> = {
	APPROVED: "channels-common:listingStatuses.approved",
	BLOCKED: "channels-common:listingStatuses.blocked",
	DEACTIVATED: "channels-common:listingStatuses.deactivated",
	PENDING: "channels-common:listingStatuses.pending",
	REJECTED: "channels-common:listingStatuses.rejected",
	SUSPENDED: "channels-common:listingStatuses.suspended",
}

export default smsListingStatusesLocaleMap
