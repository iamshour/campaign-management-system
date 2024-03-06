//#region Import
import type { SmsListingRequest } from "../types"
//#endregion

const smsListingRequestsFieldsLocalMap: Partial<Record<keyof SmsListingRequest, string>> = {
	action: "channels-common:fields.action",
	company: "channels-common:fields.company",
	country: "channels-common:fields.country",
	sender: "channels-common:fields.sender",
	type: "channels-common:fields.type",
	updatedAt: "channels-common:fields.updatedAt",
}

export default smsListingRequestsFieldsLocalMap
