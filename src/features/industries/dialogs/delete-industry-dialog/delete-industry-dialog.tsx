//#region Import
import { lazy, useState } from "react"

import { Dialog } from "@/ui"

const DeleteIndustryDialogContent = lazy(() => import("./delete-industry-dialog-content"))
//#endregion

interface DeleteIndustryDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof DeleteIndustryDialogContent>, "onClose"> {
	/**
	 * Trigger Button/Element for triggering Dialog
	 */
	children: React.ReactNode
}

const DeleteIndustryDialog = ({ children, ...industry }: DeleteIndustryDialogProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content title='Delete Industry' className='h-[400px] w-[288px] sm:h-[385px] sm:w-[390px]'>
				<DeleteIndustryDialogContent {...industry} onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteIndustryDialog
