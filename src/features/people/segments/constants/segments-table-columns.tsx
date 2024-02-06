//#region Import
import { lazy } from "react"

import type { ColumnType } from "@/ui"
import { format } from "@/utils"

import type { Segment } from "../types"

import segmentFieldsLocaleMap from "./segment-fields-locale-map"

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
		header: segmentFieldsLocaleMap.createdAt,
		cell: (createdAt) => <>{format(new Date(createdAt), "MM-dd-yyyy")}</>,
		sortable: true,
	},
	{
		accessorKey: "actions",
		cell: (_, { id }) => <SegmentsViewTableActions id={id} />,
	},
]

export default segmentsTableColumns
