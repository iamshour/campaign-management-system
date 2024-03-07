//#region Import
import MoveToGroupDialog from "@/features/people/groups/dialogs/move-to-group-dialog/move-to-group-dialog"
import RemoveFromGroupDialog from "@/features/people/groups/dialogs/remove-from-group-dialog/remove-from-group-dialog"
import { Dropdown } from "@/ui"
import { DropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { useState } from "react"
import { useTranslation } from "react-i18next"
//#endregion

const MultiEditDropdown = () => {
	const { t } = useTranslation("contacts")

	const [open, setOpen] = useState(false)

	return (
		<Dropdown onOpenChange={setOpen} open={open}>
			<Dropdown.Trigger variant='secondary'>{t("table.topbar.actions.edit.title")}</Dropdown.Trigger>
			<Dropdown.Content align='start' sideOffset={0}>
				<DropdownStateContext.Provider value={{ closeDropdown: () => setOpen(false) }}>
					<MoveToGroupDialog>
						<Dropdown.Item>Move to Group</Dropdown.Item>
					</MoveToGroupDialog>

					<Dropdown.Separator />

					<RemoveFromGroupDialog>
						<Dropdown.Item>Remove from this Group</Dropdown.Item>
					</RemoveFromGroupDialog>
				</DropdownStateContext.Provider>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default MultiEditDropdown
