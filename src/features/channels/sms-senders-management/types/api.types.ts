//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type {
	ChannelSourceListingDetails,
	ChannelSourceListingStatus,
	ChannelSourceRequestAction,
	ChannelSourceRequestStatus,
	ChannelType,
} from "@/features/channels/common/types/data.types"
import type { TemplateType } from "@/features/templates/common/types"
import type { DateRange } from "@/ui"
import type { Country } from "react-phone-number-input"

import type { ChannelSourceOptOut, ChannelSourceRequest, ChannelSourceRequestDetails } from "./data.types"
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
 * Body Arguments passed to the `updateChannelSourceRequestAction` mutation, used to provide an action for a channel source request
 * P.S. `reason` is only required if action is 'BLOCK' or 'REJECT'
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

/**
 * Body Arguments passed to the `updateChannelSourceListingStatus` mutation, used to update status for a channel source listing
 * P.S. `channelSourceListingStatusReason` is only required if “channelSourceListingStatus” is Rejected/Blocked/Suspended (Refer to Page 145 in SRD)
 */
export type UpdateChannelSourceListingStatusBody = {
	channelSourceListingId: string
} & (
	| {
			channelSourceListingStatus: Extract<ChannelSourceListingStatus, "APPROVED" | "NEW">
	  }
	| {
			channelSourceListingStatus: Extract<ChannelSourceListingStatus, "BLOCKED" | "REJECTED" | "SUSPENDED">
			channelSourceListingStatusReason: string
	  }
)

type ChannelSourceOptOutSearchFilter = { any?: true; recipient?: string }

export type ChannelSourceOptOutFilter = { countries?: Country[] }

/**
 * Params passed to the `getChannelSourceRequests` query, used to fetch Channel Source requests
 */
export type GetChannelSourceOptOutListParams = ChannelSourceOptOutSearchFilter &
	ChannelSourceOptOutFilter &
	PaginationAndSorting<ChannelSourceOptOut> & {
		channelSourceId: string
	}

export type ImportChannelSourceOptOutBody = {
	channelSourceId: string
	optOutFile: FormData
}

/**
 * Params passed to the `exportOptOutList` query, used to fetch export channel source opted out List
 */
export type ExportChannelSourceOptOutListParams = ChannelSourceOptOutSearchFilter &
	ChannelSourceOptOutFilter & {
		channelSourceId: string
		fileName: string
		optOutsIdsList: string[] | undefined
	}

/**
 * Body Arguments passed to the `optInOptedOutChannelSourceList` mutation, used to opt in opted out destinations
 */
export type OptInOptedOutChannelSourceListBody = {
	channelSourceId: string
	channelSourceOptOutFilter: ChannelSourceOptOutFilter | undefined
	channelSourceOptOutSearchFilter: ChannelSourceOptOutSearchFilter | undefined
	optOutsIdsList: string[] | undefined
}
