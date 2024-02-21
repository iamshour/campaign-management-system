//#region Import
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

import { Dialog } from "@/ui"

const EditContactDialogContent = lazy(() => import("./edit-contact-dialog-content"))
//#endregion

interface EditContactDialogProps extends Pick<React.ComponentPropsWithoutRef<typeof EditContactDialogContent>, "id"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const EditContactDialog = ({ id, children }: EditContactDialogProps) => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.editContact" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				title={t("title")}
				className='h-[765px] w-[382px] sm:h-[553px] sm:w-[746px] '
				onInteractOutside={(e) => e.preventDefault()}>
				<EditContactDialogContent id={id} closeDialog={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default EditContactDialog
