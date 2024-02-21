//#region Import
import { memo } from "react"

import DeleteGroupDialog from "@/features/people/groups/dialogs/delete-group-dialog"
import EditGroupDialog from "@/features/people/groups/dialogs/edit-group-dialog/edit-group-dialog"
import type { Group } from "@/features/people/groups/types"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
//#endregion

const GroupsViewTableActions = memo((props: Pick<Group, "groupId" | "groupName" | "description">) => (
	<ActionsDropdown>
		<EditGroupDialog {...props}>
			<ActionsDropdown.Item>
				<span>Edit</span>
			</ActionsDropdown.Item>
		</EditGroupDialog>

		<DeleteGroupDialog groupId={props?.groupId}>
			<ActionsDropdown.Item>
				<span>Delete</span>
			</ActionsDropdown.Item>
		</DeleteGroupDialog>
	</ActionsDropdown>
))

GroupsViewTableActions.displayName = "GroupsViewTableActions"

export default GroupsViewTableActions
