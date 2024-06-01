//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const EditContactDialogContent = lazy(() => import("./edit-contact-dialog-content"))
//#endregion

interface EditContactDialogProps extends Pick<React.ComponentPropsWithoutRef<typeof EditContactDialogContent>, "id"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const EditContactDialog = ({ children, id }: EditContactDialogProps) => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.editContact" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[813px] w-[382px] sm:h-[609px] sm:w-[746px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t("title")}>
				<EditContactDialogContent closeDialog={() => setOpen(false)} id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default EditContactDialog
