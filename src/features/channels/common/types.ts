/* eslint-disable perfectionist/sort-object-types*/

//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { TemplateType } from "@/features/templates/common/types"
import type { DateRange } from "@/ui"
import type { Country } from "react-phone-number-input"

import type { SmsSenderRequestDetailsType } from "../sms-senders-management/types"
import type { SmsSenderType } from "../sms-senders/types"
import type { ChannelSourceListingStatus, ChannelSourceRequestStatus, ChannelType } from "./types/data.types"
//#endregion

/**
 * Fields to allow search on, to be sent in params of request for api call `getSmsSenders`
 */
type SmsSenderSearchFilter = { any?: true; name?: string }

/**
 * Filters used in Filters bar, to be sent in params of request for api call `getSmsSenders`
 */
export type SmsSenderFilter = DateRange & {
	channelType: ChannelType
	templateTypes?: TemplateType[]
}

/**
 * Params passed to the `getSmsSenders` query, used for fetching SMS Senders List
 */
export type GetSmsSendersParams = PaginationAndSorting<SmsSenderType> & SmsSenderFilter & SmsSenderSearchFilter

/**
 * Type for the response body from backend when fetching senders list
 */
export type SmsSenderServerType = Omit<SmsSenderType, "name" | "types"> & {
	channelSourceName: string
	templateTypes: TemplateType[]
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

/**
 * Params passed to the `getSmsListings` query, used for fetching SMS Listings List
 */
export type GetSmsListingdParams = PaginationAndSorting<SmsListingType> &
	SmsListingsFilter &
	Pick<SmsListingType, "channelType" | "sourceId">
