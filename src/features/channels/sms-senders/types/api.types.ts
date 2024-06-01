//#region Import
import type { ChannelSourceRequestInfo, ChannelType } from "../../common/types/data.types"
//#endregion

/**
 * Body Arguments passed to the `resendChannelSourceRequest` mutation, used to resend a listing request
 */
export type ResendChannelSourceRequestBody = {
	channelSourceId?: string
	channelSourceListingId: string
	note?: string
	sample: string
}

/**
 * Body Arguments passed to the `addChannelSourceRequest` mutation, used to send a new listing request
 */
export type AddChannelSourceRequestBody = {
	channelSource: string
	channelSourceId?: string
	channelSourceRequestRoute: ChannelSourceRequestInfo
	channelType: ChannelType
	companyId: string
	note?: string
}

/**
 * Body Arguments passed to the `toggleChannelSourceListingActivation` mutation, used to activate and deactivate
 */
export type ToggleChannelSourceListingActivationBody = {
	active: boolean
	listingId: string
}
