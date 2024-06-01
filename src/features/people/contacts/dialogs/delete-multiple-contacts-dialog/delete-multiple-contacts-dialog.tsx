//#region Import
import { Dialog } from "@/ui"
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
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content className='h-[330px] w-[450px] sm:h-[319px] sm:w-[500px]' title={t("title.multiple")}>
				<DeleteMultipleContactsDialogContent onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteMultipleContactsDialog
