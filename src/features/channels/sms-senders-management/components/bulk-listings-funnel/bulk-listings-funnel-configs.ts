//#region Import
import type { BulkListingsGroup, ListingField } from "./types"
//#endregion

export const emptyListingField: ListingField = { content: undefined, country: undefined }

export const emptyBulkListingsGroup: BulkListingsGroup = {
	listingsFields: [emptyListingField],
}
