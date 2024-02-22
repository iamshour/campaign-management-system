//#region Import
import { lazy } from "react"

import { Dialog } from "@/ui"

const CreateSmsTemplateDialogContent = lazy(() => import("./create-sms-template-dialog-content"))
//#endregion

interface CreateSmsTemplateDialogProps {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const CreateSmsTemplateDialog = ({ children }: CreateSmsTemplateDialogProps) => (
	<Dialog>
		<Dialog.Trigger asChild>{children}</Dialog.Trigger>

		<Dialog.Content title='Create Template' className='w-[631px] md:h-[565px]'>
			<CreateSmsTemplateDialogContent />
		</Dialog.Content>
	</Dialog>
)

export default CreateSmsTemplateDialog
