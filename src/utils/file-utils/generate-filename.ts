//#region Import
import { format } from "date-fns"
//#endregion

/**
 * @description Utility Function used to generate File name.
 * @param company Company label as first part of filename
 * @param prefix A custom prefx to be displayed in the middle of filename
 * @returns
 */
const generateFileName = (company: string, prefix: string) => {
	const currentDate = format(new Date(), "MM-dd-yyyy")

	return `${company}_${prefix}_${currentDate}`
}

export default generateFileName
