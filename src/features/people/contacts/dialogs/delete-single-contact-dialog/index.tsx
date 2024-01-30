//#region Import
import { Dialog } from "@blueai/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const DeleteSingleContactDialogContent = lazy(() => import("./delete-single-contact-dialog-content"))
//#endregion

interface DeleteSingleContactsDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof DeleteSingleContactDialogContent>, "id"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const DeleteSingleContactsDialog = ({ children, id }: DeleteSingleContactsDialogProps) => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.deleteContacts" })
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content title={t("title.single")} className='h-[201px] w-[319.5px] sm:h-[209px] sm:w-[350px]'>
				<DeleteSingleContactDialogContent id={id} onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteSingleContactsDialog
