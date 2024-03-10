//#region Import
import type { TemplateType } from "@/features/templates/common/types"
import type { Country } from "react-phone-number-input"
//#endregion

export type ChannelSourceListingStatus = "APPROVED" | "BLOCKED" | "NEW" | "REJECTED" | "SUSPENDED"

export type ChannelType = "SMS_INTERNATIONAL" | "SMS_LOCAL"

export type ChannelSourceRequestAction = "APPROVE" | "BLOCK" | "REJECT"

export type ChannelSourceRequestStatus = "COMPLETED" | "PENDING"

export type FetchListingRequestDetailsIds = Record<"channelSourceListingId" | "channelSourceRequestId", string>

export type ChannelSourceListing = {
	active: boolean
	channelSourceListingStatus: ChannelSourceListingStatus
	company: Record<"id" | "name", string>
	country: Country
	id: string
	lastChannelSourceRequestStatus: ChannelSourceRequestStatus
	templateType: TemplateType
	updatedAt: string
}

export type ChannelSourceListingDetails = ChannelSourceListing & {
	channelSourceId: string
	channelSourceListingStatusReason: string
	sample: string
}

export type ChannelSource = {
	channelSourceName: string
	createdAt: string
	id: string
	templateTypes: TemplateType[]
}
