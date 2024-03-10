//#region Import
import type { ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"
import type { TemplateType } from "@/features/templates/common/types"
import type { Country } from "react-phone-number-input"
//#endregion

export type ListingField = {
	content?: string
	country?: Country
	status?: Extract<ChannelSourceListingStatus, "APPROVED" | "BLOCKED">
}

export type BulkListingsGroup = { listingsFields: ListingField[]; type?: TemplateType }

export type BulkListingsFunnelBase = { bulkListingsGroups: BulkListingsGroup[] }
