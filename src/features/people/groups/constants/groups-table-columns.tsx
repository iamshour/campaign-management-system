//#region Import
import DataGridDateCell from "@/core/components/data-grid-date-cell"
import type { ColumnType } from "@/ui"

import type { Group } from "../types"
import GroupsViewTableActions from "../views/groups-view/groups-view-table-actions"

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
		cell: (date) => <DataGridDateCell date={date} />,
	},
	{
		accessorKey: "actions",
		cell: (_, { groupId, groupName, description }) => (
			<GroupsViewTableActions groupId={groupId} groupName={groupName} description={description} />
		),
	},
]

export default grouspsTableColumns
