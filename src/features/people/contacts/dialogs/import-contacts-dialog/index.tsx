//#region Import
import Dialog from "@package/ui/src/dialog"
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
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content
				title={title}
				className='h-[552px] w-[542px] sm:h-[705px] sm:w-[870px]'
				onInteractOutside={(e) => e.preventDefault()}>
				<ImportContactsDialogContext onClose={() => setOpen(false)}>
					<ImportContactsDialogContent />
				</ImportContactsDialogContext>
			</Dialog.Content>
		</Dialog>
	)
}

export default ImportContactsDialog
