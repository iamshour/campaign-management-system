//#region Import
import type { ContactScreamSnakeCaseKey } from "../types"
//#endregion

const fileMappingHeadersMap: Record<ContactScreamSnakeCaseKey, string> = {
	FIRST_NAME: "contacts:fields.firstName",
	LAST_NAME: "contacts:fields.lastName",
	EMAIL: "contacts:fields.email",
	PHONE_NUMBER: "contacts:fields.phoneNumber",
	NOTE: "contacts:fields.note",
}

const fileMappingHeadersOptions = (Object.entries(fileMappingHeadersMap) as [ContactScreamSnakeCaseKey, string][]).map(
	([value, label]) => ({ label, value })
)

export default fileMappingHeadersOptions
