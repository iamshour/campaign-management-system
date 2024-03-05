//#region Import
import type { SmsListingRequest } from "../types"
//#endregion

const smsListingRequestsFieldsLocalMap: Partial<Record<keyof SmsListingRequest, string>> = {
	action: "senders-management:fields.action",
	company: "senders-management:fields.company",
	dateTime: "senders-management:fields.dateTime",
	sender: "senders-management:fields.sender",
	targetCountry: "senders-management:fields.targetCountry",
	type: "senders-management:fields.type",
}

export default smsListingRequestsFieldsLocalMap
