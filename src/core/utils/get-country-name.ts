//#region Import
import type { Country } from "react-phone-number-input"

import en from "react-phone-number-input/locale/en.json"
//#endregion

/**
 * @description Function to get country name from ison code
 * @param Country iso code
 * @returns Country name
 * TODO: currently function returns country name in english only, need to return country name based on selected language (i18n.language)
 */
const getCountryName = (countryCode: Country) => {
	if (!countryCode) return ""

	return en[countryCode]
}

export default getCountryName
