/* eslint-disable react-refresh/only-export-components */
//#region Import
import { lazy } from "react"

import type { IndustryType } from "@/features/industries/types"
import type { ColumnType } from "@/ui"

import industryFieldsMap from "./industry-fields-map"

const DataGridDateCell = lazy(() => import("@/core/components/data-grid-date-cell"))
const IndustriesViewTableIcon = lazy(
	() => import("@/features/industries/views/industries-view/industries-view-table-icon")
)
const IndustriesViewTableActions = lazy(
	() => import("@/features/industries/views/industries-view/industries-view-table-actions")
)
//#endregion

const industriesTableColumns: ColumnType<IndustryType>[] = [
	{
		accessorKey: "icon",
		header: industryFieldsMap.icon,
		cell: (_, { icon, color }) => <IndustriesViewTableIcon icon={icon} color={color} />,
	},
	{
		accessorKey: "name",
		header: industryFieldsMap.name,
		sortable: true,
	},
	{
		accessorKey: "description",
		header: industryFieldsMap.description,
		cell: (desc) => <span title={desc}>{desc}</span>,
	},
	{
		accessorKey: "createdAt",
		header: industryFieldsMap.createdAt,
		cell: (date) => <DataGridDateCell date={date} />,
		sortable: true,
	},
	{
		accessorKey: "actions",
		// Hide Actions if Industry is default one (named `others` from server)
		cell: (_, row) => row?.name.toLocaleLowerCase() !== "others" && <IndustriesViewTableActions {...row} />,
	},
]

export default industriesTableColumns
