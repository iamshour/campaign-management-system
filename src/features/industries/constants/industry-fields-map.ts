//#region Import
import type { IndustryType } from "../types"
//#endregion

const industryFieldsMap: Partial<Record<keyof IndustryType, string>> = {
	icon: "industries:fields.icon",
	name: "industries:fields.name",
	description: "industries:fields.description",
	createdAt: "industries:fields.createdAt",
}

export default industryFieldsMap
