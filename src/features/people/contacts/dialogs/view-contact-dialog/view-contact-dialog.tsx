//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"

const ViewContactDialogContent = lazy(() => import("./view-contact-dialog-content"))
//#endregion

interface ViewContactDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
	/**
	 * Useful in case we want to trigger this dialog by passing a button as children
	 */
	children?: React.ReactNode
	/**
	 * Contact id passed
	 */
	id?: string

	/**
	 * Dialog Title (localized)
	 */
	title: string
}

const ViewContactDialog = ({ children, id, title, ...props }: ViewContactDialogProps) => {
	if (!id) return

	return (
		<Dialog {...props}>
			{!!children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}
			<Dialog.Content className='h-[831px] w-[382px] sm:h-[567px] sm:w-[762px]' title={title}>
				<ViewContactDialogContent id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ViewContactDialog
