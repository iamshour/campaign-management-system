//#region Import
import type { ContactExportField } from "../types"
//#endregion

const contactExportsFieldsMap: Partial<Record<ContactExportField, string>> = {
	"First name": "contacts:fields.firstName",
	"Last name": "contacts:fields.lastName",
	"Email address": "contacts:fields.email",
	"Phone number": "contacts:fields.phoneNumber",
	Groups: "contacts:fields.groups",
	Tags: "contacts:fields.tags",
	"Creation date": "contacts:fields.createdAt",
	Country: "contacts:fields.country",
	Note: "contacts:fields.note",
}

export default contactExportsFieldsMap
