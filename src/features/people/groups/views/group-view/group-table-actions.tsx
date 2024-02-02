//#region Import
import { useTranslation } from "react-i18next"

import EditContactDialog from "@/features/people/contacts/dialogs/edit-contact-dialog"
import MoveToGroupDialog from "@/features/people/groups/dialogs/move-to-group-dialog"
import RemoveFromGroupDialog from "@/features/people/groups/dialogs/remove-from-group-dialog"
import { Dropdown } from "@/ui"

import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
//#endregion

const GroupTableActions = ({ id }: { id: string }) => {
	const { t } = useTranslation("groups", { keyPrefix: "components.groupContactsTable.actionsDropdown" })

	return (
		<Dropdown>
			<Dropdown.Trigger showArrow={false} variant='ghost' className='h-max w-max p-1.5'>
				<BiThreeDotsVertical />
			</Dropdown.Trigger>

			<Dropdown.Content sideOffset={0} align='end'>
				<EditContactDialog id={id}>
					<Dropdown.Item>{t("edit")}</Dropdown.Item>
				</EditContactDialog>
				<Dropdown.Separator />

				<MoveToGroupDialog id={id}>
					<Dropdown.Item>{t("move")}</Dropdown.Item>
				</MoveToGroupDialog>

				<Dropdown.Separator />

				<RemoveFromGroupDialog id={id}>
					<Dropdown.Item>{t("remove")}</Dropdown.Item>
				</RemoveFromGroupDialog>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default GroupTableActions
