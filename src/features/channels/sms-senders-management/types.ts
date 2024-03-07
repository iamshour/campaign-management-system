//#region Import
import type { Country } from "react-phone-number-input"

import { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import { TemplateType } from "@/features/templates/common/types"
import { DateRange } from "@/ui"

import type { RequestActionType, SmsListingRequestStatus, SmsListingType } from "../common/types"
//#endregion

/**
 * Shape of fetched SMS Sender
 */
export type SmsListingRequest = {
	action?: RequestActionType
	company: string
	country: Country
	id: string
	sender: string
	type: TemplateType
	updatedAt: string
}

export type SmsListingPendingRequestFilter = DateRange & {
	country?: Country[]
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
export type SmsSenderRequestDetailsType = {
	actionReason?: string
	category: TemplateType
	company: string
	country: Country
	listingDetails: Pick<SmsListingType, "status" | "statusReason">
	requestAction?: RequestActionType
	requesterUserEmail: string
	requestId: string
	requestNote?: string
	requestStatus: SmsListingRequestStatus
	sampleContent: string
	sourceName: string
	updatedAt: string
}

/**
 * Body Arguments passed to the `updateSmsListingStatus` mutation, used to update status for an sms listing
 */
export type UpdateSmsSourceRequestBody = {
	requestId: SmsSenderRequestDetailsType["requestId"]
} & (
	| {
			actionReason: SmsSenderRequestDetailsType["actionReason"]
			requestAction: Extract<SmsSenderRequestDetailsType["requestAction"], "REJECTED_BLOCKED" | "REJECTED">
	  }
	| {
			requestAction: Extract<SmsSenderRequestDetailsType["requestAction"], "APPROVED">
	  }
)

/**
 * Body Arguments passed to the `updateSmsListingStatus` mutation, used to update status for an sms listing
 * P.S. `statusReason` is only required if status is 'BLOCKED' or 'REJECTED'
 */
export type UpdateSmsListingStatusBody = {
	listingId: SmsListingType["listingId"]
} & (
	| {
			status: Extract<SmsListingType["status"], "APPROVED">
	  }
	| {
			status: Extract<SmsListingType["status"], "BLOCKED" | "REJECTED">
			statusReason: SmsListingType["statusReason"]
	  }
)
