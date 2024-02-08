//#region Import
import { useTranslation } from "react-i18next"

import MoveToGroupDialog from "@/features/people/groups/dialogs/move-to-group-dialog/move-to-group-dialog"
import RemoveFromGroupDialog from "@/features/people/groups/dialogs/remove-from-group-dialog/remove-from-group-dialog"
import { Dropdown } from "@/ui"
//#endregion

const MultiEditDropdown = () => {
	const { t } = useTranslation("contacts")

	return (
		<Dropdown>
			<Dropdown.Trigger variant='secondary'>{t("table.toolbar.actions.edit.title")}</Dropdown.Trigger>
			<Dropdown.Content align='start' sideOffset={0}>
				<MoveToGroupDialog>
					<Dropdown.Item>Move to Group</Dropdown.Item>
				</MoveToGroupDialog>

				<Dropdown.Separator />

				<RemoveFromGroupDialog>
					<Dropdown.Item>Remove from this Group</Dropdown.Item>
				</RemoveFromGroupDialog>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default MultiEditDropdown
