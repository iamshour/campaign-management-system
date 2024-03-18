//#region Import
import type { ChannelSourceOptOut } from "../types/data.types"
//#endregion

const smsOptedOutFieldsLocaleMap: Partial<Record<keyof ChannelSourceOptOut, string>> = {
	country: "channels-common:fields.country",
	recipient: "senders-management:views.smsOptedOutSenders.fields.destination",
}

export default smsOptedOutFieldsLocaleMap
