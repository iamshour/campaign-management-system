//#region Import
import { getCountries } from "react-phone-number-input"
// eslint-disable-next-line
// @ts-ignore
import en from "react-phone-number-input/locale/en"
//#endregion

const isoCountryOptions = getCountries().map((country) => ({ label: en[country] as string, value: country }))

export default isoCountryOptions
