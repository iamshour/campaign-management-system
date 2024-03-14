/* eslint-disable react-refresh/only-export-components */
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { IndustryType } from "@/features/industries/types"

//#region Import
import { lazy } from "react"

import industryFieldsMap from "./industry-fields-map"

const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))

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
		cell: (_, { color, icon }) => <IndustriesViewTableIcon color={color} icon={icon} />,
		header: industryFieldsMap.icon,
	},
	{
		accessorKey: "name",
		header: industryFieldsMap.name,
		sortable: true,
	},
	{
		accessorKey: "description",
		cell: (desc) => <span title={desc}>{desc}</span>,
		header: industryFieldsMap.description,
	},
	{
		accessorKey: "createdAt",
		cell: (date) => <DataViewDateCell date={date} dateFormat='MM-dd-yyyy | hh:mm aaa' />,
		header: industryFieldsMap.createdAt,
		sortable: true,
	},
	{
		accessorKey: "actions",
		// Hide Actions if Industry is default one (named `others` from server)
		cell: (_, row) => row?.name.toLocaleLowerCase() !== "others" && <IndustriesViewTableActions {...row} />,
	},
]

export default industriesTableColumns
