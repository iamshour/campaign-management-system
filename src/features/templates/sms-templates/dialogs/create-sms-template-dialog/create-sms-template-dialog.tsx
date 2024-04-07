//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"

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

		<Dialog.Content className='w-[631px] md:h-[565px]' title='Create Template'>
			<CreateSmsTemplateDialogContent />
		</Dialog.Content>
	</Dialog>
)

export default CreateSmsTemplateDialog
