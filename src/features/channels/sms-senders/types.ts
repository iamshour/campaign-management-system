//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { SmsListingStatus } from "@/features/channels/common/types"
import type { SmsListingRequestStatus } from "@/features/channels/sms-senders-management/types"
import type { TemplateType } from "@/features/templates/common/types"
import type { DateRange } from "@/ui"
import type { Country } from "react-phone-number-input"
//#endregion

/**
 * Type options for the SMS Channel
 */
export type SmsChannelTypeOption = "international" | "local"

/* ******* */
/* ******* */
/* SENDERS */
/* ******* */
/* ******* */

/**
 * Type options for the SMS Sender dataView key
 */
export type SmsSenderDataViewKeyOptions = "international-sms-senders" | "local-sms-senders"

/**
 * Shape of fetched SMS Sender
 */
export type SmsSenderType = {
	createdAt: string
	id: string
	name: string
	types: TemplateType[]
}

/**
 * Filters used in Filters bar, to be sent in params of request for api call `getSmsSenders`
 */
export type SmsSenderFilter = DateRange & {
	channelType?: SmsChannelTypeOption
	types?: TemplateType[]
}

/**
 * Fields to allow search on, to be sent in params of request for api call `getSmsSenders`
 */
type SmsSenderSearchFilter = { any?: true; name?: string }

/**
 * Params passed to the `getSmsSenders` query, used for fetching SMS Senders List
 */
export type GetSmsSendersParams = PaginationAndSorting<SmsSenderType> & SmsSenderFilter & SmsSenderSearchFilter

/* ******** */
/* ******** */
/* LISTINGS */
/* ******** */
/* ******** */

/**
 * Shape of fetched SMS Sender Listing
 */
export type SmsListingType = {
	createdAt: string
	id: string
	note?: string
	requestStatus: SmsListingRequestStatus
	sampleContent: string
	sender: string
	status: SmsListingStatus
	statusChangeDate: string
	statusChangeReason: string
	targetCountry: Country
	type: TemplateType
}

/**
 * Filters used in Filters bar, to be sent in params of request for api call `getSmsListings`
 */
export type SmsListingsFilter = {
	channelType: SmsChannelTypeOption
	senderId: string
	type: TemplateType
}

/**
 * Params passed to the `getSmsListings` query, used for fetching SMS Listings List
 */
export type GetSmsListingdParams = PaginationAndSorting<SmsListingType> & SmsListingsFilter

/**
 * Body Arguments passed to the `addSmsListing` mutation, used to send a new listing request
 */
export type AddSmsListingBody = Pick<SmsListingType, "note" | "sampleContent" | "sender" | "targetCountry" | "type">
