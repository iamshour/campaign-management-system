//#region Import
import {Dialog} from "@blueai/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const DeleteMultipleContactsDialogContent = lazy(() => import("./delete-multiple-contacts-dialog-content"))
//#endregion

interface DeleteMultipleContactsDialogProps {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const DeleteMultipleContactsDialog = ({ children }: DeleteMultipleContactsDialogProps) => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.deleteContacts" })
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content title={t("title.multiple")} className='h-[330px] w-[450px] sm:h-[319px] sm:w-[500px]'>
				<DeleteMultipleContactsDialogContent onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteMultipleContactsDialog
