//#region Import
import type { ContactExportField } from "../types"

import contactExportsFieldsMap from "./contact-exports-fields-map"
//#endregion

/**
 * List of Export Fields To be used in Export Fields Dialog. @template { label: string; value: ContactExportField }[]
 */
const exportsFieldsOptions = (Object.entries(contactExportsFieldsMap) as [ContactExportField, string][]).map(
	([value, label]) => ({ label, value })
)

export default exportsFieldsOptions
