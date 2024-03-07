/* eslint-disable perfectionist/sort-object-types*/

//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { TemplateType } from "@/features/templates/common/types"
import type { DateRange } from "@/ui"
import type { Country } from "react-phone-number-input"

import type { SmsSenderRequestDetailsType } from "../sms-senders-management/types"
//#endregion

/**
 * Type options for the SMS Channel
 */
export type SmsChannelTypeOption = "international" | "local"

/**
 * Status options for the SMS Listing
 */
export type SmsListingStatus = "APPROVED" | "BLOCKED" | "DEACTIVATED" | "PENDING" | "REJECTED" | "SUSPENDED"

export type RequestActionType = "APPROVED" | "REJECTED_BLOCKED" | "REJECTED"

export type SmsListingRequestStatus = "COMPLETED" | "PENDING"

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
	status: SmsListingStatus
	statusReason: string
	// MAY NOT EXIST
	requestStatus: SmsListingRequestStatus
	channel: "international-sms" | "local-sms"
}

// MAY LOOK LIKE THIS:
// export type SmsListingType = Pick<
// 	SmsSenderRequestDetailsType,
// 	"category" | "company" | "country" | "updatedAt"
// > & {
// 	listingId: string
// 	companyId: string
// 	status: SmsListingStatus
// }
// export type GetSmsListingByIdReturnType = SmsListingType & Pick<SmsSenderRequestDetailsType, "sampleContent"> & {
// 	sourceId: string
// 	statusReason: string
// 	requestStatus: SmsListingRequestStatus
// 	channel: "international-sms" | "local-sms"
// }

/**
 * Filters used in Filters bar, to be sent in params of request for api call `getSmsListings`
 */
export type SmsListingsFilter = DateRange & {
	country?: Country[]
	status?: SmsListingStatus[]
	type?: TemplateType[]
}

/**
 * Params passed to the `getSmsListings` query, used for fetching SMS Listings List
 */
export type GetSmsListingdParams = PaginationAndSorting<SmsListingType> &
	SmsListingsFilter &
	Pick<SmsListingType, "channel" | "sourceId">
