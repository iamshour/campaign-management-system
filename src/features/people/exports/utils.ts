//#region Import
import { format } from "@package/utils"

import { ExportsType } from "./dialogs/export-fields-dialog/export-fields-dialog-content"
//#endregion

/**
 * @description Utility Function used to get Exports File name.
 * 				Will return either: `[Company name]_${exportsType}_[Current Date]` where exportsType May be `contacts` or `segments`
 * @param company
 * @param exportsType
 * @returns
 */
export const getDefaultExportsFileName = (company: string, exportsType: Omit<ExportsType, "contacts-in-group">) => {
	const currentDate = format(new Date(), "MM-dd-yyyy")

	return `${company}_${exportsType}_${currentDate}`
}
