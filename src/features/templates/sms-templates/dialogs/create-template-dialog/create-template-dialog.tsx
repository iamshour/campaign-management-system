//#region Import
import { lazy } from "react"

import { Dialog } from "@/ui"

const CreateTemplateDialogContent = lazy(() => import("./create-template-dialog-content"))
//#endregion

interface CreateTemplateDialogProps {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const CreateTemplateDialog = ({ children }: CreateTemplateDialogProps) => {
	return (
		<Dialog>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content title='Create Template' className='w-[631px] md:h-[565px]'>
				<CreateTemplateDialogContent />
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateTemplateDialog
