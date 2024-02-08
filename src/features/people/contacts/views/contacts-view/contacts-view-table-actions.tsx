//#region Import
import DeleteSingleContactsDialog from "@/features/people/contacts/dialogs/delete-single-contact-dialog/delete-single-contact-dialog"
import EditContactDialog from "@/features/people/contacts/dialogs/edit-contact-dialog/edit-contact-dialog"
import { Dropdown } from "@/ui"

import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
//#endregion

const ContactsViewTableActions = ({ id }: { id: string }) => (
	<Dropdown>
		<Dropdown.Trigger showArrow={false} variant='ghost' className='h-max w-max p-1.5'>
			<BiThreeDotsVertical />
		</Dropdown.Trigger>

		<Dropdown.Content sideOffset={0} align='end'>
			<EditContactDialog id={id}>
				<Dropdown.Item>Edit</Dropdown.Item>
			</EditContactDialog>

			<Dropdown.Separator />

			<DeleteSingleContactsDialog id={id}>
				<Dropdown.Item>Delete</Dropdown.Item>
			</DeleteSingleContactsDialog>
		</Dropdown.Content>
	</Dropdown>
)

export default ContactsViewTableActions
