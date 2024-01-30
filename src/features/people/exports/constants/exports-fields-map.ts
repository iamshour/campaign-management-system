import type { ContactExports } from "../types"

const exportsFieldsMap: Partial<Record<keyof ContactExports, string>> = {
	fileName: "exports:fields.fileName",
	exportedBy: "exports:fields.exportedBy",
	contactCount: "exports:fields.contactCount",
	createdAt: "exports:fields.createdAt",
	contactExportStatus: "exports:fields.contactExportStatus",
}

export default exportsFieldsMap
