/* eslint-disable react-refresh/only-export-components */
//#region Import
import { lazy } from "react"

import type { ColumnType } from "@/ui"

import type { IndustryType } from "../types"

import industryFieldsMap from "./industry-fields-map"

const IndustriesViewTableIcon = lazy(() => import("../views/industries-view/industries-view-table-icon"))
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
]

export default industriesTableColumns
