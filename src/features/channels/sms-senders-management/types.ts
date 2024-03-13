//#region Import
import type { TemplateType } from "@/features/templates/common/types"
import type { Country } from "react-phone-number-input"

import type { ChannelSourceListingStatus, ChannelType } from "../common/types/data.types"
//#endregion

/**
 * Body Arguments passed to the `addBulkSmsListings` mutation, used to send multiple new listings
 */
export type AddBulkSmsListingsBody = {
	channelSource: string
	channelSourceRequestRouteList: {
		channelSourceListingStatus?: Extract<ChannelSourceListingStatus, "APPROVED" | "BLOCKED">
		country: Country
		sample: string
		templateType: TemplateType
	}[]
	channelType: ChannelType
	companyId: string
	note?: string
	userId: string
}

/**
 * Body Arguments passed to the `addBulkSmsListingRequests` mutation, used to send multiple new listing requests
 */
export type AddBulkSmsListingRequestsBody = Omit<AddBulkSmsListingsBody, "channelSourceRequestRouteList"> & {
	channelSourceRequestRouteList: Omit<
		AddBulkSmsListingsBody["channelSourceRequestRouteList"][number],
		"channelSourceListingStatus"
	>[]
}
