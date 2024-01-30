//#region Import
import type { ColumnType } from "@package/ui/src/table/types"
import { format } from "@package/utils"

import type { Group } from "../types"
import GroupsTableActions from "../views/groups-view/groups-table-actions"

import groupFieldsMap from "./group-fields-map"
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
