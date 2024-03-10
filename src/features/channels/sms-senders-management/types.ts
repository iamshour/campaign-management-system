//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { TemplateType } from "@/features/templates/common/types"
import type { Country } from "react-phone-number-input"

import type { SmsListingType } from "../common/types"
import type {
	ChannelSourceListingStatus,
	ChannelSourceRequestAction,
	ChannelSourceRequestStatus,
	ChannelType,
} from "../common/types/data.types"
//#endregion

/**
 * Shape of fetched SMS Sender
 */
export type SmsListingRequest = {
	action?: ChannelSourceRequestAction
	company: string
	country: Country
	id: string
	sender: string
	type: TemplateType
	updatedAt: string
}

/**
 * Params passed to the `getSenderListingRequestsQuery` query, used to fetch Sender Listing Requests List
 */
export type SmsSenderRequestDetailsType = {
	actionReason?: string
	category: TemplateType
	company: string
	country: Country
	listingDetails: Pick<SmsListingType, "status" | "statusReason">
	requestAction?: ChannelSourceRequestAction
	requesterUserEmail: string
	requestId: string
	requestNote?: string
	requestStatus: ChannelSourceRequestStatus
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
			requestAction: Extract<ChannelSourceRequestAction, "BLOCK" | "REJECT">
	  }
	| {
			requestAction: Extract<ChannelSourceRequestAction, "APPROVE">
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
			status: Extract<SmsListingType["status"], "BLOCKED" | "REJECTED" | "SUSPENDED">
			statusReason: SmsListingType["statusReason"]
	  }
)

export type SmsOptedOutSenderType = {
	country: Country
	id: string
	phoneNumber: string
}

/**
 * Filters used in Filters bar
 */
export type SmsOptedOutFilter = {
	country: Country[]
}

/**
 * Params passed to the `getSenderListingRequestsQuery` query, used to fetch Sender Listing Requests List
 */
// export type GetSmsOptedOutSendersParams = PaginationAndSorting<SmsOptedOutSenderType> & SmsListingPendingRequestFilter
export type GetSmsOptedOutSendersParams = PaginationAndSorting<SmsOptedOutSenderType> & any

/**
 * Body Arguments passed to the `optInSmsSenders` mutation, used to Opt in Sms Senders
 */
export type OptInSmsSendersBody = {
	ids?: string[]
	// optInSearchFilter?: OptInSearchFilter
}

/**
 * Params passed to the `exportOptOutSmsSendersQuery` query, used to export download an exported file of opted-out sms senders
 */
export type ExportOptOutSmsSendersParams = {
	fileName: string
	ids?: string[]
}

/**
 * Body Arguments passed to the `addBulkSmsListings` mutation, used to send multiple new listings
 */
export type AddBulkSmsListingsBody = {
	channelSource: string
	channelSourceRequestRouteList: {
		channelSourceListingStatus?: Extract<ChannelSourceListingStatus, "APPROVED" | "BLOCKED">
		country: Country
		sample: string
		templateType: TemplateType
	}[]
	channelType: ChannelType
	companyId: string
	note?: string
	userId: string
}

/**
 * Body Arguments passed to the `addBulkSmsListingRequests` mutation, used to send multiple new listing requests
 */
export type AddBulkSmsListingRequestsBody = Omit<AddBulkSmsListingsBody, "channelSourceRequestRouteList"> & {
	channelSourceRequestRouteList: Omit<
		AddBulkSmsListingsBody["channelSourceRequestRouteList"][number],
		"channelSourceListingStatus"
	>[]
}

export type UserInCompany = {
	companyId: string
	email: string
	id: string
}
