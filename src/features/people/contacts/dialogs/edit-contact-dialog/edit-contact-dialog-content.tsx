//#region Import
import { Button,
	NotFoundError,
	Skeleton, type UseFormReturn } from "@blueai/ui"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useGetContactByIdQuery, useUpdateContactMutation } from "@/features/people/contacts/api"
import ContactForm from "@/features/people/contacts/components/contact-form"
import type { ContactSchemaType } from "@/features/people/contacts/schemas/contact-schema"
import type { AddNewContactArgs } from "@/features/people/contacts/types"
import { addLeadingPlusToPhoneNumber } from "@/features/people/contacts/utils"
//#endregion

export interface EditContactDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void

	/**
	 * contact id, passed in case we're editing a contact
	 */
	id: string
}

const EditContactDialogContent = ({ onClose, id }: EditContactDialogContentProps) => {
	const { t } = useTranslation("contacts")

	const { values, isFetching, isFetchError } = useGetContactByIdQuery(id, {
		selectFromResult: ({ data, isError, ...rest }) => ({
			values: {
				...data,
				groups: data?.groups?.map(({ name, id }) => ({ label: name, value: id })),
				// If Phone number exists, add + prefix for compatability with the PhoneNumberInput Component
				phoneNumber: addLeadingPlusToPhoneNumber(data?.phoneNumber),
			},
			isFetchError: isError,
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
	const onSubmit = async (body: AddNewContactArgs, form: UseFormReturn<ContactSchemaType>) => {
		if (!body) return

		await updateContact({ id, ...body })
			.unwrap()
			.then(() => {
				form.reset()
				onClose()
				toast.success(t("dialogs.addContact.message.editContactSuccess"))
			})
	}

	if (isFetching) return <Skeleton className='h-full' />
	if (isFetchError) return <NotFoundError />

	return (
		<ContactForm onSubmit={onSubmit} defaultValues={values}>
			<Button type='submit' loading={isUpdateLoading} disabled={isUpdateLoading}>
				{t("dialogs.editContact.buttons.save")}
			</Button>
		</ContactForm>
	)
}

export default EditContactDialogContent
