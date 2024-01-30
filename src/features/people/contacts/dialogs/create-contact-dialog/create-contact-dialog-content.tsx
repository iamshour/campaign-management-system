//#region Import
import type { UseFormReturn } from "@package/ui"
import Button from "@package/ui/src/button"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useAddNewContactMutation } from "@/features/people/contacts/api"
import ContactForm from "@/features/people/contacts/components/contact-form"
import type { ContactSchemaType } from "@/features/people/contacts/schemas/contact-schema"
import type { AddNewContactArgs } from "@/features/people/contacts/types"
//#endregion

interface CreateContactDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

type ButtonClicked = "singleAddContact" | "multiAddContact"

const CreateContactDialogContent = ({ onClose }: CreateContactDialogContentProps) => {
	const { t } = useTranslation("contacts")

	const [addContact, { isLoading }] = useAddNewContactMutation()

	// tracking which button was clicked to show appropriate loader
	const [buttonClicked, setButtonClicked] = useState<ButtonClicked | undefined>()

	/**
	 * Used to send validated data from the `ContactForm` component to the server, for adding the contact entry
	 *
	 * @param body Validated data passed back from the `ContactForm` component
	 * @param form form passed from the `ContactForm` component, which we can access to reset from data, or handle other
	 *             actions such as sending back an error on a specific field
	 */
	const onSubmit = async (body: AddNewContactArgs, form: UseFormReturn<ContactSchemaType>) => {
		if (!body) return

		await addContact(body)
			.unwrap()
			.then(() => {
				form.reset()

				// Sending appropriate success message based on button clicked (Add single contact, or add multiple)
				toast.success(t(`dialogs.addContact.message.${buttonClicked}Success`))

				if (buttonClicked === "singleAddContact") onClose()

				setButtonClicked(undefined)
			})
	}

	return (
		<ContactForm onSubmit={onSubmit}>
			<Button
				type='submit'
				variant='outline'
				loading={isLoading && buttonClicked === "multiAddContact"}
				disabled={isLoading}
				onClick={() => setButtonClicked("multiAddContact")}>
				{t("dialogs.addContact.buttons.multiAdd")}
			</Button>
			<Button
				type='submit'
				className='ms-auto'
				loading={isLoading && buttonClicked === "singleAddContact"}
				disabled={isLoading}
				onClick={() => setButtonClicked("singleAddContact")}>
				{t("dialogs.addContact.buttons.singleAdd")}
			</Button>
		</ContactForm>
	)
}

export default CreateContactDialogContent
