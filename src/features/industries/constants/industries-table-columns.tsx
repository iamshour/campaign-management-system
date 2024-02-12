/* eslint-disable react-refresh/only-export-components */
//#region Import
import { lazy } from "react"

import type { IndustryType } from "@/features/industries/types"
import type { ColumnType } from "@/ui"

import industryFieldsMap from "./industry-fields-map"

const AdvancedTableDateCell = lazy(() => import("@/core/components/advanced-table-date-cell"))
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
	},
	{
		accessorKey: "createdAt",
		header: industryFieldsMap.createdAt,
		cell: (date) => <AdvancedTableDateCell date={date} />,
		sortable: true,
	},
	{
		accessorKey: "actions",
		cell: (_, { id }) => <IndustriesViewTableActions id={id} />,
	},
]

export default industriesTableColumns
