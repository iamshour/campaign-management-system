//#region Import
import type { ContactExportField } from "../types"
//#endregion

const contactExportsFieldsMap: Partial<Record<ContactExportField, string>> = {
	Country: "contacts:fields.country",
	"Creation date": "contacts:fields.createdAt",
	"Email address": "contacts:fields.email",
	"First name": "contacts:fields.firstName",
	Groups: "contacts:fields.groups",
	"Last name": "contacts:fields.lastName",
	Note: "contacts:fields.note",
	"Phone number": "contacts:fields.phoneNumber",
	Tags: "contacts:fields.tags",
}

export default contactExportsFieldsMap
