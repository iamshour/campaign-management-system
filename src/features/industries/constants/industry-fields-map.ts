//#region Import
import type { IndustryType } from "../types"
//#endregion

const industryFieldsMap: Partial<Record<keyof IndustryType, string>> = {
	createdAt: "industries:fields.createdAt",
	description: "industries:fields.description",
	icon: "industries:fields.icon",
	name: "industries:fields.name",
}

export default industryFieldsMap
