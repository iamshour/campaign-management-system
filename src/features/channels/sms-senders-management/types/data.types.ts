//#region Import
import type {
	ChannelSourceRequestAction,
	ChannelSourceRequestStatus,
} from "@/features/channels/common/types/data.types"
import type { TemplateType } from "@/features/templates/common/types"
import type { Country } from "react-phone-number-input"
//#endregion

export type ChannelSourceRequest = {
	action: ChannelSourceRequestAction
	channelSourceListingId: string
	channelSourceName: string
	channelSourceRequestId: string
	channelSourceRequestStatus: ChannelSourceRequestStatus
	company: Record<"id" | "name", string>
	country: Country
	createdAt: string
	templateType: TemplateType
	updatedAt: string
}

export type ChannelSourceRequestDetails = ChannelSourceRequest & {
	actionReason: string
	note: string
	sample: string
	userEmail: string
}

export type ChannelSourceOptOut = {
	channelSourceId: string
	country: Country
	id: string
	recipient: string
}
