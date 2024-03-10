/* eslint-disable perfectionist/sort-object-types*/

//#region Import
import type { TemplateType } from "@/features/templates/common/types"
import type { DateRange } from "@/ui"
import type { Country } from "react-phone-number-input"

import type { SmsSenderRequestDetailsType } from "../sms-senders-management/types"
import type { ChannelSourceListingStatus, ChannelSourceRequestStatus, ChannelType } from "./types/data.types"
//#endregion

/**
 * Filters used in Filters bar, to be sent in params of request for api call `getSmsSenders`
 */
export type SmsSenderFilter = DateRange & {
	channelType: ChannelType
	templateTypes?: TemplateType[]
}

/**
 * Shape of fetched SMS Sender Listing
 */
export type SmsListingType = Pick<
	SmsSenderRequestDetailsType,
	"category" | "company" | "country" | "sampleContent" | "updatedAt"
> & {
	companyId: string
	listingId: string
	sourceId: string
	status: ChannelSourceListingStatus
	statusReason: string
	// MAY NOT EXIST
	requestStatus: ChannelSourceRequestStatus
	channelType: ChannelType
}

/**
 * Filters used in Filters bar, to be sent in params of request for api call `getSmsListings`
 */
export type SmsListingsFilter = DateRange & {
	country?: Country[]
	status?: ChannelSourceListingStatus[]
	type?: TemplateType[]
}
