//#region Import
import type { ColumnType } from "@/core/components/data-grid/types"

import { lazy } from "react"

import type { Group } from "../types"

import groupFieldsMap from "./group-fields-map"

// eslint-disable-next-line react-refresh/only-export-components
const DataGridDateCell = lazy(() => import("@/core/components/data-grid/data-grid-date-cell"))

// eslint-disable-next-line react-refresh/only-export-components
const GroupsViewTableActions = lazy(() => import("../views/groups-view/groups-view-table-actions"))
//#endregion

const grouspsTableColumns: ColumnType<Group>[] = [
	{
		accessorKey: "groupName",
		header: groupFieldsMap.groupName,
	},
	{
		accessorKey: "description",
		header: groupFieldsMap.description,
	},
	{
		accessorKey: "contactsCount",
		header: groupFieldsMap.contactsCount,
	},
	{
		accessorKey: "createdAt",
		cell: (date) => <DataGridDateCell date={date} />,
		header: groupFieldsMap.createdAt,
	},
	{
		accessorKey: "actions",
		cell: (_, { description, groupId, groupName }) => (
			<GroupsViewTableActions description={description} groupId={groupId} groupName={groupName} />
		),
	},
]

export default grouspsTableColumns
