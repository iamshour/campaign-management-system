//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"

const DiscardTemplateChangesDialogContent = lazy(() => import("./discard-template-changes-dialog-content"))
//#endregion

interface DiscardTemplateChangesDialogProps {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const DiscardTemplateChangesDialog = ({ children }: DiscardTemplateChangesDialogProps) => (
	<Dialog>
		<Dialog.Trigger asChild>{children}</Dialog.Trigger>

		<Dialog.Content className='flex h-[220px] w-[390px] flex-col justify-between p-[30px]' title='Discard Changes'>
			<DiscardTemplateChangesDialogContent />
		</Dialog.Content>
	</Dialog>
)

export default DiscardTemplateChangesDialog
