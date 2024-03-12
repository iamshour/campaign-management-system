//#region Import
import type { ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"
//#endregion

/**
 * Type options for the SMS Channel Sources dataView key
 */
export type SmsChannelSourceDataViewKey = "international-sms-channel-sources" | "local-sms-channel-sources"

/**
 * Status options to be displayed in ListingCard.
 * "DEACTIVATED" and "PENDING" are extra statuses that are not options for listing status but may be displayed as listing status in specific cases.
 * (refer to getListingDisplayStatus)
 */
export type ChannelSourceListingDisplayStatus = "DEACTIVATED" | "PENDING" | ChannelSourceListingStatus
