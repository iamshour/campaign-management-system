//#region Import
import { useDeleteContactsMutation } from "@/features/people/contacts/api"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface DeleteContactsDialogContent {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Contact Id for the contact we want to delete
	 */
	id: string
}

const DeleteContactsDialogContent = ({ closeDialog, id }: DeleteContactsDialogContent) => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.deleteContacts" })

	const { closeDropdown } = useDropdownStateContext()

	const [deleteContacts, { isLoading }] = useDeleteContactsMutation()

	const onSubmit = async () => {
		await deleteContacts({ contactsIds: [id] }).unwrap()

		toast.success(t("success.single"))

		closeDialog()
		closeDropdown()
	}

	return (
		<div className='flex h-full flex-col justify-between gap-6 p-2'>
			<p className='w-full overflow-x-auto text-base'>{t("message", { count: 1 })}</p>

			<Button className='ms-auto w-full px-10 sm:w-max' loading={isLoading} onClick={onSubmit} type='submit'>
				{t("actions.submit")}
			</Button>
		</div>
	)
}

export default DeleteContactsDialogContent
