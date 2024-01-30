//#region Import
import Dialog from "@package/ui/src/dialog"
import { lazy } from "react"

const ViewContactDialogContent = lazy(() => import("./view-contact-dialog-content"))
//#endregion

interface ViewContactDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
	/**
	 * Dialog Title (localized)
	 */
	title: string
	/**
	 * Contact id passed
	 */
	id?: string

	/**
	 * Useful in case we want to trigger this dialog by passing a button as children
	 */
	children?: React.ReactNode
}

const ViewContactDialog = ({ title, id, children, ...props }: ViewContactDialogProps) => {
	if (!id) return

	return (
		<Dialog {...props}>
			{!!children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}
			<Dialog.Content title={title} className='h-[831px] w-[382px] sm:h-[567px] sm:w-[762px]'>
				<ViewContactDialogContent id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ViewContactDialog
