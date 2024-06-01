//#region Import
import type { ContactScreamSnakeCaseKey } from "../types"
//#endregion

const fileMappingHeadersMap: Record<ContactScreamSnakeCaseKey, string> = {
	EMAIL: "contacts:fields.email",
	FIRST_NAME: "contacts:fields.firstName",
	LAST_NAME: "contacts:fields.lastName",
	NOTE: "contacts:fields.note",
	PHONE_NUMBER: "contacts:fields.phoneNumber",
}

const fileMappingHeadersOptions = (Object.entries(fileMappingHeadersMap) as [ContactScreamSnakeCaseKey, string][]).map(
	([value, label]) => ({ label, value })
)

export default fileMappingHeadersOptions
