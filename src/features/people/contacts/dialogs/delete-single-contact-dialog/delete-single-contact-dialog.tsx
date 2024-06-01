//#region Import
import { Dialog } from "@/ui"
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
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content className='h-[201px] w-[319.5px] sm:h-[209px] sm:w-[350px]' title={t("title.single")}>
				<DeleteSingleContactDialogContent closeDialog={() => setOpen(false)} id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteSingleContactsDialog
