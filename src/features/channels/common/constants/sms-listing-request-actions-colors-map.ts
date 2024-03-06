//#region Import
import type { RequestActionType } from "../types"
//#endregion

const smsListingRequestActionsColorsMap: Record<RequestActionType, string> = {
	APPROVED: "#28B745",
	REJECTED: "#F5788C",
	REJECTED_BLOCKED: "#EB2344",
}

export default smsListingRequestActionsColorsMap
