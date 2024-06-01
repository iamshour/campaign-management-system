//#region Import
import DeleteMultipleContactsDialog from "@/features/people/contacts/dialogs/delete-multiple-contacts-dialog/delete-multiple-contacts-dialog"
import EditMultipleContactsDialog from "@/features/people/contacts/dialogs/edit-multiple-contacts-dialog/edit-multiple-contacts-dialog"
import { Dropdown } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

const MultiEditDropdown = () => {
	const { t } = useTranslation("contacts")

	// TODO: USE onDropdownClose Inside (First Wrap Dropdown with DropdownStateContext)

	return (
		<Dropdown>
			<Dropdown.Trigger variant='secondary'>{t("table.topbar.actions.edit.title")}</Dropdown.Trigger>
			<Dropdown.Content align='start' sideOffset={0}>
				<DeleteMultipleContactsDialog>
					<Dropdown.Item>{t("table.topbar.actions.edit.delete")}</Dropdown.Item>
				</DeleteMultipleContactsDialog>

				<Dropdown.Separator />

				<EditMultipleContactsDialog actionType='addTags' title={t("dialogs.editMultiple.addTags.title")}>
					<Dropdown.Item>{t("table.topbar.actions.edit.addTags")}</Dropdown.Item>
				</EditMultipleContactsDialog>

				<Dropdown.Separator />

				<EditMultipleContactsDialog actionType='removeTags' title={t("dialogs.editMultiple.removeTags.title")}>
					<Dropdown.Item>{t("table.topbar.actions.edit.removeTags")}</Dropdown.Item>
				</EditMultipleContactsDialog>

				<Dropdown.Separator />

				<EditMultipleContactsDialog actionType='addToGroups' title={t("dialogs.editMultiple.addToGroups.title")}>
					<Dropdown.Item>{t("table.topbar.actions.edit.addToGroups")}</Dropdown.Item>
				</EditMultipleContactsDialog>

				<Dropdown.Separator />

				<EditMultipleContactsDialog
					actionType='removeFromGroups'
					title={t("dialogs.editMultiple.removeFromGroups.title")}>
					<Dropdown.Item>{t("table.topbar.actions.edit.removeGroups")}</Dropdown.Item>
				</EditMultipleContactsDialog>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default MultiEditDropdown
