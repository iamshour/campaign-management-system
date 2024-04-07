//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"

import { lazy } from "react"

import type { Segment } from "../types"

import segmentFieldsLocaleMap from "./segment-fields-locale-map"

// eslint-disable-next-line react-refresh/only-export-components
const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))

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
		cell: (date) => <DataViewDateCell date={date} />,
		header: segmentFieldsLocaleMap.createdAt,
		sortable: true,
	},
	{
		accessorKey: "actions",
		cell: (_, { id }) => <SegmentsViewTableActions id={id} />,
	},
]

export default segmentsTableColumns
