//#region Import
import type { TemplateType } from "@/features/templates/common/types"
import type { Country } from "react-phone-number-input"

import type { ChannelType } from "../common/types/data.types"
//#endregion

/**
 * Type options for the SMS Channel Sources dataView key
 */
export type SmsChannelSourceDataViewKey = "international-sms-channel-sources" | "local-sms-channel-sources"

/**
 * Body Arguments passed to the `addChannelSourceRequest` mutation, used to send a new listing request
 */
export type AddChannelSourceRequestBody = {
	channelSource: string
	channelSourceId?: string
	channelSourceRequestRoute: {
		country: Country
		sample: string
		templateType: TemplateType
	}
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
