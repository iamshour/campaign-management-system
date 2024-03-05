//#region Import
import type { RequestActionType } from "../types"
//#endregion

const smsListingRequestsActionsLocalMap: Record<RequestActionType, string> = {
	APPROVED: "senders-management:components.selectMultiListingRequestActionPopover.options.approved",
	REJECTED: "senders-management:components.selectMultiListingRequestActionPopover.options.rejected",
	REJECTED_BLOCKED: "senders-management:components.selectMultiListingRequestActionPopover.options.rejectedAndBlocked",
}

export default smsListingRequestsActionsLocalMap
