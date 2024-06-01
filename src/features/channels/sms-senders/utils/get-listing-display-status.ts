//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import { ChannelSourceListingDisplayStatus } from "@/features/channels/sms-senders/types/data.types"
//#endregion

/**
 * Function that return the listing status to be displayed in ListingCard, and to be used to select the card color.
 *
 * Rules to follow when selecting status:
 * 		- In case Listing status is NEW, REJECTED, SUSPENDED and Latest request status is PENDING, should display "Pending"
 * 		- Otherwise show the actual listing status (channelSourceListingStatus)
 *
 * Note: status "PENDING" is added as extension to ChannelSourceListingStatus since it is not a listing status option.
 *
 * @param channelSourceListingStatus status of the listing
 * @param lastChannelSourceRequestStatus status of the request
 * @returns final status to display
 */
const getListingDisplayStatus = (
	channelSourceListingStatus: ChannelSourceListing["channelSourceListingStatus"],
	lastChannelSourceRequestStatus: ChannelSourceListing["lastChannelSourceRequestStatus"]
): ChannelSourceListingDisplayStatus => {
	if (
		["BLOCKED", "NEW", "REJECTED"].includes(channelSourceListingStatus) &&
		lastChannelSourceRequestStatus === "PENDING"
	) {
		return "PENDING"
	}

	return channelSourceListingStatus
}

export default getListingDisplayStatus
