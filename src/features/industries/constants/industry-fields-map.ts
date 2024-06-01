//#region Import
import type { IndustryType } from "../types"
//#endregion

const industryFieldsMap: Partial<Record<keyof IndustryType, string>> = {
	createdAt: "industries:fields.createdAt.label",
	description: "industries:fields.description.label",
	industryIcon: "industries:fields.icon.label",
	name: "industries:fields.name.label",
}

export default industryFieldsMap
