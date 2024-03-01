//#region Import
import type { ContactExportStatusOption } from "../types"

import exportsStatusesLocalMap from "./exports-statuses-local-map"
//#endregion

/**
 * List of Export Fields To be used in Export Fields Dialog. @template { label: string; value: ContactExportField }[]
 */
const exportsStatusesOptions = (Object.entries(exportsStatusesLocalMap) as [ContactExportStatusOption, string][]).map(
	([value, label]) => ({ label, value })
)

export default exportsStatusesOptions
