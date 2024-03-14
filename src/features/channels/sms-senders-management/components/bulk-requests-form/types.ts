//#region Import
import type { ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"
import type { TemplateType } from "@/features/templates/common/types"
import type { Country } from "react-phone-number-input"

import { OptionType } from "@/ui"

import { AddBulkChannelSourceRequestsBody } from "../../types/api.types"

//#endregion

export type ListingField = {
	country?: Country
	sampleContent?: string
	status?: Extract<ChannelSourceListingStatus, "APPROVED" | "BLOCKED">
}

export type BulkListingsGroup = { listingsFields: ListingField[]; templateType?: TemplateType }

export type BulkListingsFunnelBase = { bulkListingsGroups: BulkListingsGroup[] }

export type ListingError = { errorIdx: number; errorMessage: string }

export type BulkPreviewData = Omit<
	AddBulkChannelSourceRequestsBody,
	"channelSource" | "channelSourceRequestRouteList" | "companyId" | "userId"
> & {
	channelSource?: string
	channelSourceRequestRouteList: (AddBulkChannelSourceRequestsBody["channelSourceRequestRouteList"][number] & {
		errorKey: string
	})[]

	company: OptionType
	email?: OptionType
}
