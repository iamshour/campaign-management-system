//#region Import
import type { SmsListingType } from "@/features/channels/common/types"
//#endregion

const smsListingsFieldsLocalMap: Partial<Record<keyof SmsListingType, string>> = {
	category: "channels-common:fields.type",
	company: "channels-common:fields.company",
	country: "channels-common:fields.country",
	status: "channels-common:fields.listingStatus",
	updatedAt: "channels-common:fields.updatedAt",
}

export default smsListingsFieldsLocalMap
