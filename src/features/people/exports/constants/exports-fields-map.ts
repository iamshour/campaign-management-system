import type { ContactExports } from "../types"

const exportsFieldsMap: Partial<Record<keyof ContactExports, string>> = {
	contactCount: "exports:fields.contactCount",
	contactExportStatus: "exports:fields.contactExportStatus",
	createdAt: "exports:fields.createdAt",
	exportedBy: "exports:fields.exportedBy",
	fileName: "exports:fields.fileName",
}

export default exportsFieldsMap
