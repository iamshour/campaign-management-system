//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const CreateContactDialogContent = lazy(() => import("./create-contact-dialog-content"))
//#endregion

interface CreateContactDialogProps {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const CreateContactDialog = ({ children }: CreateContactDialogProps) => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.addContact" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[813px] w-[382px] sm:h-[629px] sm:w-[746px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t("title")}>
				<CreateContactDialogContent onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateContactDialog
