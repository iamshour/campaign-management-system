//#region Import
import type { Group } from "@/features/people/groups/types"

import DeleteGroupDialog from "@/features/people/groups/dialogs/delete-group-dialog/delete-group-dialog"
import EditGroupDialog from "@/features/people/groups/dialogs/edit-group-dialog/edit-group-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { memo } from "react"
//#endregion

interface GroupsViewTableActionsProps extends Pick<Group, "description" | "groupId" | "groupName"> {
	/**
	 * className to be passed to ActionsDropdown
	 */
	className?: string
}

const GroupsViewTableActions = memo(({ className, ...group }: GroupsViewTableActionsProps) => (
	<ActionsDropdown className={className}>
		<EditGroupDialog {...group}>
			<ActionsDropdown.Item>
				<span>Edit</span>
			</ActionsDropdown.Item>
		</EditGroupDialog>

		<DeleteGroupDialog groupId={group?.groupId}>
			<ActionsDropdown.Item>
				<span>Delete</span>
			</ActionsDropdown.Item>
		</DeleteGroupDialog>
	</ActionsDropdown>
))

GroupsViewTableActions.displayName = "GroupsViewTableActions"

export default GroupsViewTableActions
