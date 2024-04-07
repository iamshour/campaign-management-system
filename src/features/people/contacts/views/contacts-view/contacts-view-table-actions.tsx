//#region Import
import DeleteSingleContactsDialog from "@/features/people/contacts/dialogs/delete-single-contact-dialog/delete-single-contact-dialog"
import EditContactDialog from "@/features/people/contacts/dialogs/edit-contact-dialog/edit-contact-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { memo } from "react"
//#endregion

const ContactsViewTableActions = memo(({ id }: { id: string }) => (
	<ActionsDropdown>
		<EditContactDialog id={id}>
			<ActionsDropdown.Item>Edit</ActionsDropdown.Item>
		</EditContactDialog>
		<ActionsDropdown.Separator />
		<DeleteSingleContactsDialog id={id}>
			<ActionsDropdown.Item>Delete</ActionsDropdown.Item>
		</DeleteSingleContactsDialog>
	</ActionsDropdown>
))

ContactsViewTableActions.displayName = "ContactsViewTableActions"

export default ContactsViewTableActions
