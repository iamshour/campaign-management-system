//#region Import
import type { ContactSchemaType } from "@/features/people/contacts/schemas/contact-schema"
import type { AddNewContactBody } from "@/features/people/contacts/types"

import { useAddNewContactMutation } from "@/features/people/contacts/api"
import ContactForm from "@/features/people/contacts/components/contact-form"
import { Button, type UseFormReturn } from "@/ui"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

interface CreateContactDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

type ButtonClicked = "multiAddContact" | "singleAddContact"

const CreateContactDialogContent = ({ onClose }: CreateContactDialogContentProps) => {
	const { t } = useTranslation("contacts")

	const [triggerAddContact, { isLoading }] = useAddNewContactMutation()

	// tracking which button was clicked to show appropriate loader
	const [buttonClicked, setButtonClicked] = useState<ButtonClicked | undefined>()

	/**
	 * Used to send validated data from the `ContactForm` component to the server, for adding the contact entry
	 *
	 * @param body Validated data passed back from the `ContactForm` component
	 * @param form form passed from the `ContactForm` component, which we can access to reset from data, or handle other
	 *             actions such as sending back an error on a specific field
	 */
	const onSubmit = async (body: AddNewContactBody, form: UseFormReturn<ContactSchemaType>) => {
		if (!body) return

		await triggerAddContact(body).unwrap()

		form.reset()

		// Sending appropriate success message based on button clicked (Add single contact, or add multiple)
		toast.success(t(`dialogs.addContact.message.${buttonClicked}Success`))

		if (buttonClicked === "singleAddContact") onClose()

		setButtonClicked(undefined)
	}

	return (
		<ContactForm onSubmit={onSubmit}>
			<Button
				data-form='contact-form'
				disabled={isLoading}
				loading={isLoading && buttonClicked === "multiAddContact"}
				onClick={() => setButtonClicked("multiAddContact")}
				type='submit'
				variant='outline'>
				{t("dialogs.addContact.buttons.multiAdd")}
			</Button>
			<Button
				className='ms-auto px-10'
				data-form='contact-form'
				disabled={isLoading}
				loading={isLoading && buttonClicked === "singleAddContact"}
				onClick={() => setButtonClicked("singleAddContact")}
				type='submit'>
				{t("dialogs.addContact.buttons.singleAdd")}
			</Button>
		</ContactForm>
	)
}

export default CreateContactDialogContent
