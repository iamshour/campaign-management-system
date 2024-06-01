//#region Import
import EditContactDialog from "@/features/people/contacts/dialogs/edit-contact-dialog/edit-contact-dialog"
import MoveToGroupDialog from "@/features/people/groups/dialogs/move-to-group-dialog/move-to-group-dialog"
import RemoveFromGroupDialog from "@/features/people/groups/dialogs/remove-from-group-dialog/remove-from-group-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { memo } from "react"
import { useTranslation } from "react-i18next"
//#endregion

const GroupViewTableActions = memo(({ id }: { id: string }) => {
	const { t } = useTranslation("groups", { keyPrefix: "components.groupContactsTable.actionsDropdown" })

	return (
		<ActionsDropdown>
			<EditContactDialog id={id}>
				<ActionsDropdown.Item>{t("edit")}</ActionsDropdown.Item>
			</EditContactDialog>
			<ActionsDropdown.Separator />

			<MoveToGroupDialog id={id}>
				<ActionsDropdown.Item>{t("move")}</ActionsDropdown.Item>
			</MoveToGroupDialog>

			<ActionsDropdown.Separator />

			<RemoveFromGroupDialog id={id}>
				<ActionsDropdown.Item>{t("remove")}</ActionsDropdown.Item>
			</RemoveFromGroupDialog>
		</ActionsDropdown>
	)
})

GroupViewTableActions.displayName = "GroupViewTableActions"

export default GroupViewTableActions
