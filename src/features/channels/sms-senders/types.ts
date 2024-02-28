//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { DateRange } from "@/ui"
import type { Country } from "react-phone-number-input"
//#endregion

/**
 * Type options for the SMS Sender
 */
export type SmsSenderTypeOption = "OTP" | "PROMOTIONAL" | "TRANSACTIONAL"

/**
 * Status options for the SMS Sender
 */
export type SmsSenderStatusOption = "Approved" | "Blocked" | "Pending" | "Rejected" | "Suspended"

/**
 * Type options for the SMS Channel
 */
export type SmsChannelTypeOption = "international" | "local"

/**
 * Shape of fetched SMS Sender
 */
export type SmsSenderType = {
	createdAt: string
	id: string
	name: string
	note: string
	sampleContent: string
	status: SmsSenderStatusOption
	statusChangeDate: string
	statusChangeReason: string
	targetCountry: Country
	type: SmsSenderTypeOption
}

/**
 * Filters used in Filters bar, to be sent in params of request for api call `getSmsSenders`
 */
export type SenderFilter = DateRange & {
	channelType?: SmsChannelTypeOption
	types?: SmsSenderTypeOption[]
}

/**
 * Fields to allow search on, to be sent in params of request for api call `getSmsSenders`
 */
type SenderSearchFilter = { any?: true; name?: string }

/**
 * Params passed to the `getSmsSenders` query, used for fetching SMS Senders List
 */
export type GetSmsSendersParams = PaginationAndSorting<SmsSenderType> & SenderFilter & SenderSearchFilter
