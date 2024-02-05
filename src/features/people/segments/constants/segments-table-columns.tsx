//#region Import
import { lazy } from "react"

import type { ColumnType } from "@/ui"
import { format } from "@/utils"

import type { Segment } from "../types"

import segmentFieldsMap from "./segment-fields-map"

// eslint-disable-next-line react-refresh/only-export-components
const SegmentsViewTableActions = lazy(() => import("../views/segments-view/segments-view-table-actions"))
//#endregion

const segmentsTableColumns: ColumnType<Segment>[] = [
	{
		accessorKey: "name",
		header: segmentFieldsMap.name,
	},
	{
		accessorKey: "description",
		header: segmentFieldsMap.description,
	},
	{
		accessorKey: "createdAt",
		header: segmentFieldsMap.createdAt,
		cell: (createdAt) => <>{format(new Date(createdAt), "MM-dd-yyyy")}</>,
		sortable: true,
	},
	{
		accessorKey: "actions",
		cell: (_, { id }) => <SegmentsViewTableActions id={id} />,
	},
]

export default segmentsTableColumns
