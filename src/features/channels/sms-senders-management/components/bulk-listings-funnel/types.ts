//#region Import
import type { ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"
import type { TemplateType } from "@/features/templates/common/types"
import type { Country } from "react-phone-number-input"
//#endregion

export type ListingField = {
	country?: Country
	sampleContent?: string
	status?: Extract<ChannelSourceListingStatus, "APPROVED" | "BLOCKED">
}

export type BulkListingsGroup = { listingsFields: ListingField[]; templateType?: TemplateType }

export type BulkListingsFunnelBase = { bulkListingsGroups: BulkListingsGroup[] }
