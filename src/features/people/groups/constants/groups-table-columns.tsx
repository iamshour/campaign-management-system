//#region Import
import { lazy } from "react"

import type { ColumnType } from "@/ui"

import type { Group } from "../types"

import groupFieldsMap from "./group-fields-map"

// eslint-disable-next-line react-refresh/only-export-components
const AdvancedTableDateCell = lazy(() => import("@/core/components/advanced-table-date-cell"))

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
		header: groupFieldsMap.createdAt,
		cell: (date) => <AdvancedTableDateCell date={date} />,
	},
	{
		accessorKey: "actions",
		cell: (_, { groupId, groupName, description }) => (
			<GroupsViewTableActions groupId={groupId} groupName={groupName} description={description} />
		),
	},
]

export default grouspsTableColumns
