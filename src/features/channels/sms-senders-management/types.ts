//#region Import
import type { Country } from "react-phone-number-input"

import { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import { TemplateType } from "@/features/templates/common/types"
import { DateRange } from "@/ui"

import { SmsListingType } from "../sms-senders/types"

export type SmsListingRequestStatus = "COMPLETED" | "PENDING"
//#endregion

export type RequestActionType = "APPROVED" | "REJECTED_BLOCKED" | "REJECTED"

/**
 * Shape of fetched SMS Sender
 */
export type SmsListingRequest = {
	action?: RequestActionType
	company: string
	dateTime: string
	id: string
	sender: string
	targetCountry: Country
	type: TemplateType
}

export type SmsListingPendingRequestFilter = DateRange & {
	targetCountry?: Country[]
	type?: TemplateType[]
}

export type SmsListingCompletedRequestFilter = SmsListingPendingRequestFilter & {
	action: RequestActionType[]
}

/**
 * Params passed to the `getSenderListingRequestsQuery` query, used to fetch Sender Listing Requests List
 */
export type GetSmsListingRequestsParams = PaginationAndSorting<SmsListingRequest> &
	SmsListingPendingRequestFilter & { status: SmsListingRequestStatus }

/**
 * Params passed to the `getSenderListingRequestsQuery` query, used to fetch Sender Listing Requests List
 */
export type GetSmsSenderRequestDetailsByIdType = {
	actionReason?: string
	country: Country
	listingDetails?: Pick<SmsListingType, "status" | "statusChangeReason">
	requestAction?: RequestActionType
	requesterCategory: TemplateType
	requesterCompanyName: string
	requesterUserEmail: string
	requestId: string
	requestNote?: string
	requestSampleContent: string
	requestStatus: SmsListingRequestStatus
	sourceName: string
	updatedAt: string
}
