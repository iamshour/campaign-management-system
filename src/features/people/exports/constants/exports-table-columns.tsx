//#region Import
import type { ColumnType } from "@/ui"
import { format } from "@/utils"

import type { ContactExportStatusOption, ContactExports } from "../types"
import ExportsTableActions from "../views/exports-view/exports-table-actions"

import exportsFieldsMap from "./exports-fields-map"
import exportStatusesColorsMap from "./statuses-colors-map"
//#endregion

const exportsTableColumns: ColumnType<ContactExports>[] = [
	{
		accessorKey: "fileName",
		header: exportsFieldsMap.fileName,
	},
	{
		accessorKey: "exportedBy",
		header: exportsFieldsMap.exportedBy,
	},
	{
		accessorKey: "contactCount",
		header: exportsFieldsMap.contactCount,
	},
	{
		accessorKey: "createdAt",
		header: exportsFieldsMap.createdAt,
		cell: (createdAt) => <>{format(new Date(createdAt), "MM-dd-yyyy")}</>,
	},
	{
		accessorKey: "contactExportStatus",
		header: exportsFieldsMap.contactExportStatus,
		cell: (status: ContactExportStatusOption) => (
			<p style={{ color: exportStatusesColorsMap[status] ?? "" }}>{status}</p>
		),
	},
	{
		accessorKey: "actions",
		cell: (_, { id, fileName, contactExportStatus }) => (
			<ExportsTableActions id={id} fileName={fileName} contactExportStatus={contactExportStatus} />
		),
	},
]

export default exportsTableColumns
