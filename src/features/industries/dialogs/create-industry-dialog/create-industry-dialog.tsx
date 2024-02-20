//#region Import
import { lazy, useState } from "react"

import { Dialog } from "@/ui"

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
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				title='Create Industry'
				className='h-[485px] w-[288px] sm:h-[430px] sm:w-[390px]'
				onInteractOutside={(e) => e.preventDefault()}>
				<CreateIndustryDialogContent onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateIndustryDialog
