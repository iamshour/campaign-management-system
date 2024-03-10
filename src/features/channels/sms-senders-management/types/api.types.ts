//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type {
	ChannelSourceListingDetails,
	ChannelSourceRequestAction,
	ChannelSourceRequestStatus,
	ChannelType,
} from "@/features/channels/common/types/data.types"
import type { TemplateType } from "@/features/templates/common/types"
import type { DateRange } from "@/ui"
import type { Country } from "react-phone-number-input"

import type { ChannelSourceRequest, ChannelSourceRequestDetails } from "./data.types"
//#endregion

export type ChannelSourceRequestFilter = DateRange & {
	actions?: ChannelSourceRequestAction[]
	channelSourceRequestStatus: ChannelSourceRequestStatus

	channelType: ChannelType
	countries?: Country[]
	templateTypes?: TemplateType[]
}

export type ChannelSourceRequestSearchFilter = {
	any?: true
	ChannelSourceName?: string
	companyName?: string
}

/**
 * Params passed to the `getChannelSourceRequests` query, used to fetch Channel Source requests
 */
export type GetChannelSourceRequestsParams = PaginationAndSorting<ChannelSourceRequest> &
	ChannelSourceRequestFilter &
	ChannelSourceRequestSearchFilter

/**
 * Returned response shape after calling the `getChannelSourceRequestAndListingById` query, which gets request & Listing details when clicking on single request
 */
export type GetChannelSourceRequestAndListingByIdReturnType = ChannelSourceRequestDetails & {
	channelSourceListingDetails: Pick<
		ChannelSourceListingDetails,
		"channelSourceListingStatus" | "channelSourceListingStatusReason"
	>
}

/**
 * Body Arguments passed to the `updateSmsListingStatus` mutation, used to update status for an sms listing
 * P.S. `statusReason` is only required if status is 'BLOCKED' or 'REJECTED'
 */
export type UpdateChannelSourceRequestActionBody = {
	channelSourceRequestId: string
} & (
	| {
			action: Extract<ChannelSourceRequestAction, "APPROVE">
	  }
	| {
			action: Extract<ChannelSourceRequestAction, "BLOCK" | "REJECT">
			reason: string
	  }
)
