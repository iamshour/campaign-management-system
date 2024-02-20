//#region Import
import { lazy, useState } from "react"

import { Dialog } from "@/ui"

const EditIndustryDialogContent = lazy(() => import("./edit-industry-dialog-content"))
//#endregion

interface EditIndustryDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof EditIndustryDialogContent>, "onClose"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const EditIndustryDialog = ({ children, ...industry }: EditIndustryDialogProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				title='Edit Industry'
				className='h-[485px] w-[288px] sm:h-[430px] sm:w-[390px]'
				onInteractOutside={(e) => e.preventDefault()}>
				<EditIndustryDialogContent {...industry} onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default EditIndustryDialog
