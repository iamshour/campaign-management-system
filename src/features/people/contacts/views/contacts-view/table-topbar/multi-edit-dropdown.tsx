//#region Import
import { Dropdown } from "@/ui"
import { useTranslation } from "react-i18next"

import DeleteMultipleContactsDialog from "@/features/people/contacts/dialogs/delete-multiple-contacts-dialog"
import EditMultipleContactsDialog from "@/features/people/contacts/dialogs/edit-multiple-contacts-dialog"
//#endregion

const MultiEditDropdown = () => {
	const { t } = useTranslation("contacts")

	return (
		<Dropdown>
			<Dropdown.Trigger variant='secondary'>{t("table.toolbar.actions.edit.title")}</Dropdown.Trigger>
			<Dropdown.Content align='start' sideOffset={0}>
				<DeleteMultipleContactsDialog>
					<Dropdown.Item>{t("table.toolbar.actions.edit.delete")}</Dropdown.Item>
				</DeleteMultipleContactsDialog>

				<Dropdown.Separator />

				<EditMultipleContactsDialog title={t("dialogs.editMultiple.addTags.title")} actionType='addTags'>
					<Dropdown.Item>{t("table.toolbar.actions.edit.addTags")}</Dropdown.Item>
				</EditMultipleContactsDialog>

				<Dropdown.Separator />

				<EditMultipleContactsDialog title={t("dialogs.editMultiple.removeTags.title")} actionType='removeTags'>
					<Dropdown.Item>{t("table.toolbar.actions.edit.removeTags")}</Dropdown.Item>
				</EditMultipleContactsDialog>

				<Dropdown.Separator />

				<EditMultipleContactsDialog title={t("dialogs.editMultiple.addToGroups.title")} actionType='addToGroups'>
					<Dropdown.Item>{t("table.toolbar.actions.edit.addToGroups")}</Dropdown.Item>
				</EditMultipleContactsDialog>

				<Dropdown.Separator />

				<EditMultipleContactsDialog
					title={t("dialogs.editMultiple.removeFromGroups.title")}
					actionType='removeFromGroups'>
					<Dropdown.Item>{t("table.toolbar.actions.edit.removeGroups")}</Dropdown.Item>
				</EditMultipleContactsDialog>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default MultiEditDropdown
