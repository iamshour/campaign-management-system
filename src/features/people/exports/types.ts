//#region Import
import type { CommonListArguments } from "@/core/lib/redux-toolkit/types"

import type { ContactFilters } from "../contacts/types"
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
 * Search Filters Used whilst fetching Exports files, or when submitting a new export contact file (submitExportsFile Mutation)
 */
type ExportsSearchFilters = {
	fileName?: string
	statuses?: ContactExportStatusOption[]
	exportedBy?: string[]
	any?: boolean
}

/**
 * Arguments passed to the server whilst using the `getExports` query to fetch for export files
 */
export type GetExportsArgs = CommonListArguments<ContactExports> & ExportsSearchFilters

/**
 * Arguments passed to the server whilst using the `downloadExport` mutation function to download an exported file
 */
export type DownloadExportArgs = Record<"id" | "fileName", string>

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
}

/**
 * Arguments passed to the server whilst using the `submitExportsFile` mutation to export a new contacts file
 */

export type SubmitExportsFileArgs = Pick<ContactExports, "fileName"> &
	ContactFilters & {
		exportedFields: ContactExportField[]
	}
