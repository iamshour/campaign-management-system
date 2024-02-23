//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { DateRange } from "@/ui"

import type { ContactFilter, ContactSearchFilter, ContactAdvancedFilter } from "../contacts/types"
//#endregion

/**
 * Status options used when filtering for exports file using status
 */
export type ContactExportStatusOption = "IN_PROGRESS" | "FAILED" | "COMPLETED"

/**
 * Shape of Contact exports file fetched when getting list of exported files (`getExports` query)
 */
export interface ContactExports {
	fileName: string
	exportedBy: string
	contactCount: number
	createdAt: string
	contactExportStatus: ContactExportStatusOption
	id: string
}

/**
 * Filters used in Filters bar (Internally / Only Client-Side - Not sent to the server)
 */
export type ContactExportsTableFiltersType = {
	dateRange?: DateRange
	status?: ContactExportStatusOption[]
	exportedBy?: string[]
}

/**
 * Search Filters Used whilst fetching Exports files, or when submitting a new export contact file (submitExportsFile Mutation)
 */
type ExportsSearchFilters = {
	fileName?: string
	statuses?: ContactExportStatusOption[]
	exportedBy?: string[]
	any?: boolean
}

/**
 * Params passed to the `getExports` query, used to fetch export files
 */
export type GetExportsParams = PaginationAndSorting<ContactExports> & DateRange & ExportsSearchFilters

/**
 * Params passed to the `downloadExport` mutation function to download an exported file
 */
export type DownloadExportParams = Record<"id" | "fileName", string>

/**
 * Enum of Contact Fields to be exported. Created as enum not string literal to be used in zod validation for exportsSchema
 */
export enum ContactExportField {
	"First name" = "First name",
	"Last name" = "Last name",
	"Phone number" = "Phone number",
	"Email address" = "Email address",
	"Creation date" = "Creation date",
	"Tags" = "Tags",
	"Groups" = "Groups",
	"Country" = "Country",
	"Note" = "Note",
}

/**
 * Body Arguments passed to the `submitExportsFile` mutation, used to export a new contacts file
 */
export type SubmitExportsFileBody = Pick<ContactExports, "fileName"> & {
	contactsIds?: string[]
	contactFilter?: ContactFilter
	contactSearchFilter?: ContactSearchFilter
	contactAdvancedFilter?: ContactAdvancedFilter
	exportedFields: ContactExportField[]
}
