//#region Import
import type { SmsSenderType } from "../types"
//#endregion

const smsSenderFieldsLocaleMap: Partial<Record<keyof SmsSenderType, string>> = {
	createdAt: "channels-common:fields.createdAt",
	name: "channels-common:fields.sender",
	types: "channels-common:fields.type",
}

export default smsSenderFieldsLocaleMap
