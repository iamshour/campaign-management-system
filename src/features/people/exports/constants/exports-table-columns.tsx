//#region Import
import { lazy } from "react"

import type { ColumnType } from "@/ui"
import { format } from "@/utils"

import type { ContactExportStatusOption, ContactExports } from "../types"

import exportsFieldsMap from "./exports-fields-map"
import exportStatusesColorsMap from "./statuses-colors-map"

// eslint-disable-next-line react-refresh/only-export-components
const ExportsViewTableActions = lazy(() => import("../views/exports-view/exports-view-table-actions"))
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
			<ExportsViewTableActions id={id} fileName={fileName} contactExportStatus={contactExportStatus} />
		),
	},
]

export default exportsTableColumns
