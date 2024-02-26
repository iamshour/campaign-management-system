//#region Import
import type { ColumnType } from "@/core/components/data-grid/types"

import { lazy } from "react"

import type { Segment } from "../types"

import segmentFieldsLocaleMap from "./segment-fields-locale-map"

// eslint-disable-next-line react-refresh/only-export-components
const DataGridDateCell = lazy(() => import("@/core/components/data-grid/data-grid-date-cell"))

// eslint-disable-next-line react-refresh/only-export-components
const SegmentsViewTableActions = lazy(() => import("../views/segments-view/segments-view-table-actions"))
//#endregion

const segmentsTableColumns: ColumnType<Segment>[] = [
	{
		accessorKey: "name",
		header: segmentFieldsLocaleMap.name,
	},
	{
		accessorKey: "description",
		header: segmentFieldsLocaleMap.description,
	},
	{
		accessorKey: "createdAt",
		cell: (date) => <DataGridDateCell date={date} />,
		header: segmentFieldsLocaleMap.createdAt,
		sortable: true,
	},
	{
		accessorKey: "actions",
		cell: (_, { id }) => <SegmentsViewTableActions id={id} />,
	},
]

export default segmentsTableColumns
