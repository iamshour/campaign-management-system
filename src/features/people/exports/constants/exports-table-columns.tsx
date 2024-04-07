/* eslint-disable react-refresh/only-export-components */
import type { ColumnType } from "@/core/components/data-view/data-table/types"

//#region Import
import { lazy } from "react"

import type { ContactExports, ContactExportStatusOption } from "../types"

import exportsFieldsMap from "./exports-fields-map"
import exportStatusesColorsMap from "./statuses-colors-map"

const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))

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
		cell: (date) => <DataViewDateCell date={date} />,
		header: exportsFieldsMap.createdAt,
	},
	{
		accessorKey: "contactExportStatus",
		cell: (status: ContactExportStatusOption) => (
			<p style={{ color: exportStatusesColorsMap[status] ?? "" }}>{status}</p>
		),
		header: exportsFieldsMap.contactExportStatus,
	},
	{
		accessorKey: "actions",
		cell: (_, { contactExportStatus, fileName, id }) =>
			contactExportStatus !== "IN_PROGRESS" && (
				<ExportsViewTableActions contactExportStatus={contactExportStatus} fileName={fileName} id={id} />
			),
	},
]

export default exportsTableColumns
