//#region Import
import type { RequestActionType } from "../types"
//#endregion

const smsListingRequestsActionsLocalMap: Record<RequestActionType, string> = {
	APPROVED: "channels-common:listingRequestActions.approved",
	REJECTED: "channels-common:listingRequestActions.rejected",
	REJECTED_BLOCKED: "channels-common:listingRequestActions.rejectedAndBlocked",
}

export default smsListingRequestsActionsLocalMap
