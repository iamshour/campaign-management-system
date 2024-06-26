//#region Import
import type { ContactSchemaType } from "@/features/people/contacts/schemas/contact-schema"
import type { AddNewContactBody } from "@/features/people/contacts/types"

import { useGetContactByIdQuery, useUpdateContactMutation } from "@/features/people/contacts/api"
import ContactForm from "@/features/people/contacts/components/contact-form"
import { addLeadingPlusToPhoneNumber } from "@/features/people/contacts/utils"
import { Button, Skeleton, type UseFormReturn } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { cleanObject } from "@/utils"
import { lazy } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

export interface EditContactDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * contact id, passed in case we're editing a contact
	 */
	id: string
}

const EditContactDialogContent = ({ closeDialog, id }: EditContactDialogContentProps) => {
	const { t } = useTranslation("contacts")

	const { closeDropdown } = useDropdownStateContext()

	const { isFetchError, isFetching, values } = useGetContactByIdQuery(id, {
		selectFromResult: ({ data, isError, ...rest }) => ({
			isFetchError: isError,
			values: {
				...data,
				groups: data?.groups?.map(({ id, name }) => ({ label: name, value: id })),
				// If Phone number exists, add + prefix for compatability with the PhoneNumberInput Component
				phoneNumber: addLeadingPlusToPhoneNumber(data?.phoneNumber),
			},
			...rest,
		}),
	})

	const [updateContact, { isLoading: isUpdateLoading }] = useUpdateContactMutation()

	/**
	 * Used to send validated data from the `ContactForm` component to the server, for editing the contact entry
	 *
	 * @param body Validated data passed back from the `ContactForm` component
	 * @param form form passed from the `ContactForm` component, which we can access to reset from data, or handle other
	 *             actions such as sending back an error on a specific field
	 */
	const onSubmit = async (body: AddNewContactBody, form: UseFormReturn<ContactSchemaType>) => {
		if (!body) return

		await updateContact({ id, ...body }).unwrap()

		toast.success(t("dialogs.addContact.message.editContactSuccess"))
		form.reset()

		closeDialog()
		closeDropdown()
	}

	if (isFetching) return <Skeleton className='h-full' />

	if (isFetchError) return <DisplayError />

	return (
		<ContactForm defaultValues={cleanObject(values)} onSubmit={onSubmit}>
			<Button data-form='contact-form' disabled={isUpdateLoading} loading={isUpdateLoading} type='submit'>
				{t("dialogs.editContact.buttons.save")}
			</Button>
		</ContactForm>
	)
}

export default EditContactDialogContent
