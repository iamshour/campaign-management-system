//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"

const ImportContactsDialogContext = lazy(() => import("./import-contacts-dialog-context"))

const ImportContactsDialogContent = lazy(() => import("./import-contacts-dialog-content"))
//#endregion

interface ImportContactsDialogProps {
	/**
	 * Trigger Button/Element for triggering Contact Dilaog
	 */
	children: React.ReactNode

	/**
	 * Dialog Content Title (Shown in Header)
	 */
	title: string
}

const ImportContactsDialog = ({ children, title }: ImportContactsDialogProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content
				className='h-[552px] w-[542px] sm:h-[705px] sm:w-[870px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={title}>
				<ImportContactsDialogContext onClose={() => setOpen(false)}>
					<ImportContactsDialogContent />
				</ImportContactsDialogContext>
			</Dialog.Content>
		</Dialog>
	)
}

export default ImportContactsDialog
