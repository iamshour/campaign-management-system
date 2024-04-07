//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"

const EditIndustryDialogContent = lazy(() => import("./edit-industry-dialog-content"))
//#endregion

interface EditIndustryDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof EditIndustryDialogContent>, "closeDialog"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const EditIndustryDialog = ({ children, ...industry }: EditIndustryDialogProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[559px] w-[288px] sm:h-[467px] sm:w-[390px]'
				onInteractOutside={(e) => e.preventDefault()}
				title='Edit Industry'>
				<EditIndustryDialogContent {...industry} closeDialog={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default EditIndustryDialog
