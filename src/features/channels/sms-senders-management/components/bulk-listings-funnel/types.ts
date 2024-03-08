//#region Import
import type { SmsListingStatus } from "@/features/channels/common/types"
import type { TemplateType } from "@/features/templates/common/types"
import type { Country } from "react-phone-number-input"
//#endregion

export type ListingField = {
	content?: string
	country?: Country
	status?: Extract<SmsListingStatus, "APPROVED" | "BLOCKED">
}

export type BulkListingsGroup = { listingsFields: ListingField[]; type?: TemplateType }

export type BulkListingsFunnelBase = { bulkListingsGroups: BulkListingsGroup[] }
