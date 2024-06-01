//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { DateRange } from "@/ui"

import type { ContactAdvancedFilter, ContactFilter, ContactSearchFilter } from "../contacts/types"
//#endregion

/**
 * Status options used when filtering for exports file using status
 */
export type ContactExportStatusOption = "COMPLETED" | "FAILED" | "IN_PROGRESS"

/**
 * Shape of Contact exports file fetched when getting list of exported files (`getExports` query)
 */
export interface ContactExports {
	contactCount: number
	contactExportStatus: ContactExportStatusOption
	createdAt: string
	exportedBy: string
	fileName: string
	id: string
}

/**
 * Filters used in Filters bar (Internally / Only Client-Side - Not sent to the server)
 */
export type ContactExportFilter = DateRange & {
	exportedBy?: string[]
	statuses?: ContactExportStatusOption[]
}

/**
 * Search Filters Used whilst fetching Exports files, or when submitting a new export contact file (submitExportsFile Mutation)
 */
type ContactExportSearchFilter = { any?: true; fileName?: string }

/**
 * Params passed to the `getExports` query, used to fetch export files
 */
export type GetExportsParams = PaginationAndSorting<ContactExports> & ContactExportFilter & ContactExportSearchFilter

/**
 * Params passed to the `downloadExport` mutation function to download an exported file
 */
export type DownloadExportParams = Record<"fileName" | "id", string>

/**
 * Enum of Contact Fields to be exported. Created as enum not string literal to be used in zod validation for exportsSchema
 */
export enum ContactExportField {
	"Country" = "Country",
	"Creation date" = "Creation date",
	"Email address" = "Email address",
	"First name" = "First name",
	"Groups" = "Groups",
	"Last name" = "Last name",
	"Note" = "Note",
	"Phone number" = "Phone number",
	"Tags" = "Tags",
}

/**
 * Body Arguments passed to the `submitExportsFile` mutation, used to export a new contacts file
 */
export type SubmitExportsFileBody = Pick<ContactExports, "fileName"> & {
	contactAdvancedFilter?: ContactAdvancedFilter
	contactFilter?: ContactFilter
	contactSearchFilter?: ContactSearchFilter
	contactsIds?: string[]
	exportedFields: ContactExportField[]
}
