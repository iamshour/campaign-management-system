//#region Import
import { SmsOptedOutSenderType } from "../types"
//#endregion

const smsOptedOutFieldsLocaleMap: Partial<Record<keyof SmsOptedOutSenderType, string>> = {
	country: "channels-common:fields.country",
	phoneNumber: "senders-management:views.smsOptedOutSenders.fields.phoneNumbers",
}

export default smsOptedOutFieldsLocaleMap
