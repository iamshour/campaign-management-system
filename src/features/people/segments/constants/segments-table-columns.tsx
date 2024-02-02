//#region Import
import type { ColumnType } from "@/ui"
import { format } from "@/utils"

import type { Segment } from "../types"
import SegmentsRowActions from "../views/segments-view/segments-row-actions"

import segmentFieldsMap from "./segment-fields-map"

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
		cell: (_, { id }) => <SegmentsRowActions id={id} />,
	},
]

export default segmentsTableColumns
