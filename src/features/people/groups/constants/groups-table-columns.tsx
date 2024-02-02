//#region Import
import { lazy } from "react"

import type { ColumnType } from "@/ui"
import { format } from "@/utils"

import type { Group } from "../types"

import groupFieldsMap from "./group-fields-map"

// eslint-disable-next-line react-refresh/only-export-components
const GroupsTableActions = lazy(() => import("../views/groups-view/groups-table-actions"))
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
		header: groupFieldsMap.createdAt,
		cell: (createdAt) => <>{format(new Date(createdAt), "MM-dd-yyyy")}</>,
	},
	{
		accessorKey: "actions",
		cell: (_, { groupId, groupName, description }) => (
			<GroupsTableActions groupId={groupId} groupName={groupName} description={description} />
		),
	},
]

export default grouspsTableColumns
