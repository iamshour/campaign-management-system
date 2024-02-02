//#region Import
import { Button, Footer } from "@/ui"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useDeleteContactsMutation } from "@/features/people/contacts/api"
//#endregion

export interface DeleteContactsDialogContent {
	/**
	 * Contact Id for the contact we want to delete
	 */
	id: string

	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

const DeleteContactsDialogContent = ({ id, onClose }: DeleteContactsDialogContent) => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.deleteContacts" })

	const [deleteContacts, { isLoading }] = useDeleteContactsMutation()

	const onSubmit = async () => {
		await deleteContacts({ contactsIds: [id] }).unwrap()

		toast.success(t("success.single"))
		onClose()
	}

	return (
		<div className='flex h-full flex-col justify-between gap-6 p-2'>
			<p className='w-full overflow-x-auto text-base'>{t("message", { count: 1 })}</p>

			<Footer>
				<Button type='submit' loading={isLoading} className='px-10' onClick={onSubmit}>
					{t("actions.submit")}
				</Button>
			</Footer>
		</div>
	)
}

export default DeleteContactsDialogContent
