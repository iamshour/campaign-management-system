import type { ChannelSourceListing, ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"

/**
 * Function that return the listing status to be displayed in ListingCard, and to be used to select the card color.
 *
 * Rules to follow when selecting status:
 * 		- In case active flag is false, should display "Deactivated"
 * 		- In case Listing status is NEW, REJECTED, SUSPENDED and Latest request status is PENDING, should display "Pending"
 * 		- Otherwise show the actual listing status (channelSourceListingStatus)
 *
 * Note: statuses "DEACTIVATED" and "PENDING" are added as extension to ChannelSourceListingStatus since they are not
 * 		options listing status.
 *
 * @param active boolean flag indicating whether this listing is deactivated
 * @param channelSourceListingStatus status of the listing
 * @param lastChannelSourceRequestStatus status of the request
 * @returns final status to display
 */
const getListingDisplayStatus = (
	active: ChannelSourceListing["active"],
	channelSourceListingStatus: ChannelSourceListing["channelSourceListingStatus"],
	lastChannelSourceRequestStatus: ChannelSourceListing["lastChannelSourceRequestStatus"]
): "DEACTIVATED" | "PENDING" | ChannelSourceListingStatus => {
	if (active === false) return "DEACTIVATED"

	if (
		["BLOCKED", "NEW", "REJECTED"].includes(channelSourceListingStatus) &&
		lastChannelSourceRequestStatus === "PENDING"
	) {
		return "PENDING"
	}

	return channelSourceListingStatus
}

export default getListingDisplayStatus
