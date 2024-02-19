/* eslint-disable react-refresh/only-export-components */
//#region Import
import { lazy } from "react"

import type { ColumnType } from "@/ui"

import type { ContactExportStatusOption, ContactExports } from "../types"

import exportsFieldsMap from "./exports-fields-map"
import exportStatusesColorsMap from "./statuses-colors-map"

const DataGridDateCell = lazy(() => import("@/core/components/data-grid-date-cell"))

const ExportsViewTableActions = lazy(
	() => import("../views/exports-view/exports-view-table-actions/exports-view-table-actions")
)
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
		cell: (date) => <DataGridDateCell date={date} />,
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
