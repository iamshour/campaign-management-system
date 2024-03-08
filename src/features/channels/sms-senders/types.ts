//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { ChannelType, SmsListingRequestStatus, SmsListingStatus } from "@/features/channels/common/types"
import type { TemplateType } from "@/features/templates/common/types"
import type { DateRange } from "@/ui"
import type { Country } from "react-phone-number-input"
//#endregion

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
	channelType: ChannelType
	templateTypes?: TemplateType[]
}

/**
 * Fields to allow search on, to be sent in params of request for api call `getSmsSenders`
 */
type SmsSenderSearchFilter = { any?: true; name?: string }

/**
 * Type for the response body from backend when fetching senders list
 */
export type GetSmsSendersResponseType = Omit<SmsSenderType, "name" | "types"> & {
	channelSourceName: string
	templateTypes: TemplateType[]
}

/**
 * Params passed to the `getSmsSenders` query, used for fetching SMS Senders List
 */
export type GetSmsSendersParams = PaginationAndSorting<SmsSenderType> & SmsSenderFilter & SmsSenderSearchFilter

/* ******** */
/* ******** */
/* REQUESTS */
/* ******** */
/* ******** */

/**
 * Shape of fetched SMS Sender Request
 */
export type SmsRequestType = {
	country: Country
	createdAt: string
	id: string
	note?: string
	requestStatus: SmsListingRequestStatus
	sampleContent: string
	sender: string
	status: SmsListingStatus
	statusChangeDate: string
	statusChangeReason: string
	type: TemplateType
}

/**
 * Body Arguments passed to the `addSmsRequest` mutation, used to send a new listing request
 */
export type AddSmsRequestBody = {
	channelSource: string
	channelSourceRequestRoute: {
		country: Country
		sample: string
		templateType: TemplateType
	}
	channelType: ChannelType
	companyId: string
	note?: string
}
