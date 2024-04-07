//#region Import
import type { ChannelSourceRequest } from "../types/data.types"
//#endregion

const smsListingRequestsFieldsLocaleMap: Partial<Record<keyof ChannelSourceRequest, string>> = {
	action: "channels-common:fields.action",
	channelSourceName: "channels-common:fields.sender",
	company: "channels-common:fields.company",
	country: "channels-common:fields.country",
	templateType: "channels-common:fields.type",
	updatedAt: "channels-common:fields.updatedAt",
}

export default smsListingRequestsFieldsLocaleMap
