//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"
//#endregion

const smsListingsFieldsLocalMap: Partial<Record<keyof ChannelSourceListing, string>> = {
	channelSourceListingStatus: "channels-common:fields.listingStatus",
	company: "channels-common:fields.company",
	country: "channels-common:fields.country",
	templateType: "channels-common:fields.type",
	updatedAt: "channels-common:fields.updatedAt",
}

export default smsListingsFieldsLocalMap
