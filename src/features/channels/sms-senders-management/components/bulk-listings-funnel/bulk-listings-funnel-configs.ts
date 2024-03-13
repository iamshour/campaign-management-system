//#region Import
import type { BulkListingsGroup, ListingField } from "./types"
//#endregion

export const emptyListingField: ListingField = { country: undefined, sampleContent: undefined }

export const emptyBulkListingsGroup: BulkListingsGroup = {
	listingsFields: [emptyListingField],
}
