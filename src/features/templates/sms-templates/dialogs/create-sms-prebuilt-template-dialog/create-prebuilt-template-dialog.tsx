//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"

const CreatePrebuiltTemplateDialogContent = lazy(() => import("./create-prebuilt-template-dialog-content"))
//#endregion

interface CreateSmsPrebuiltTemplateDialogProps {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const CreateSmsPrebuiltTemplateDialog = ({ children }: CreateSmsPrebuiltTemplateDialogProps) => {
	return (
		<Dialog>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[817px] w-[1600px] gap-0 !px-0 !pb-0' title='Prebuilt Templates'>
				<CreatePrebuiltTemplateDialogContent />
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateSmsPrebuiltTemplateDialog
