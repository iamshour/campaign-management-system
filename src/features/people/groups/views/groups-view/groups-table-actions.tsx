//#region Import
import { useState } from "react"
import { Dropdown } from "@blueai/ui"

import CreateGroupDialog from "@/features/people/groups/dialogs/create-group-dialog"
import DeleteGroupDialog from "@/features/people/groups/dialogs/delete-group-dialog"
import type { Group } from "@/features/people/groups/types"

import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
//#endregion

const GroupsTableActions = (props: Pick<Group, "groupId" | "groupName" | "description">) => {
	const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
	const closeActionsDropDown = () => setDropDownOpen(false)

	return (
		<Dropdown open={dropDownOpen} onOpenChange={setDropDownOpen}>
			<Dropdown.Trigger showArrow={false} variant='ghost' className='h-max w-max p-1.5'>
				<BiThreeDotsVertical />
			</Dropdown.Trigger>

			<Dropdown.Content sideOffset={0} align='end'>
				<CreateGroupDialog {...props}>
					<Dropdown.Item>
						<span>Edit</span>
						<Dropdown.Shortcut>⇧⌘E</Dropdown.Shortcut>
					</Dropdown.Item>
				</CreateGroupDialog>

				<DeleteGroupDialog groupId={props?.groupId} closeActionsDropDown={closeActionsDropDown}>
					<Dropdown.Item>
						<span>Delete</span>
						<Dropdown.Shortcut>⌘⌫</Dropdown.Shortcut>
					</Dropdown.Item>
				</DeleteGroupDialog>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default GroupsTableActions
