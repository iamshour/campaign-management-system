//#region Import
import type { ChannelSourceRequestAction } from "../types/data.types"
//#endregion

const smsListingRequestsActionsLocalMap: Record<ChannelSourceRequestAction, string> = {
	APPROVE: "channels-common:listingRequestActions.approved",
	BLOCK: "channels-common:listingRequestActions.rejectedAndBlocked",
	REJECT: "channels-common:listingRequestActions.rejected",
}

export default smsListingRequestsActionsLocalMap
