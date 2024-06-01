//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"

const DeleteIndustryDialogContent = lazy(() => import("./delete-industry-dialog-content"))
//#endregion

interface DeleteIndustryDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof DeleteIndustryDialogContent>, "closeDialog"> {
	/**
	 * Trigger Button/Element for triggering Dialog
	 */
	children: React.ReactNode
}

const DeleteIndustryDialog = ({ children, ...industry }: DeleteIndustryDialogProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content className='w-[400px] sm:h-[390px]' title='Delete Industry'>
				<DeleteIndustryDialogContent {...industry} closeDialog={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteIndustryDialog
