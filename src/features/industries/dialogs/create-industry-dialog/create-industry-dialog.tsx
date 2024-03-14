//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"

const CreateIndustryDialogContent = lazy(() => import("./create-industry-dialog-content"))
//#endregion

interface CreateIndustryDialogProps {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const CreateIndustryDialog = ({ children }: CreateIndustryDialogProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[559px] w-[288px] sm:h-[467px] sm:w-[390px]'
				onInteractOutside={(e) => e.preventDefault()}
				title='Create Industry'>
				<CreateIndustryDialogContent closeDialog={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateIndustryDialog
