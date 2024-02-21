//#region Import
import { lazy } from "react"

import { Button, Dialog } from "@/ui"

const SmsPrebuiltTemplatesRoute = lazy(
	() => import("@/features/templates/sms-templates/routes/sms-prebuilt-templates-route/sms-prebuilt-templates-route")
)
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

			<Dialog.Content title='Prebuilt Templates' className='h-[817px] w-[1600px] gap-0 !px-0 !pb-0'>
				<SmsPrebuiltTemplatesRoute prebuiltTemplatesGridKey='sms-prebuilt-templates-dialog' />
				<Button className='absolute end-4 top-16' as='link' to='new-template' size='sm'>
					+ Create From Scratch
				</Button>
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateSmsPrebuiltTemplateDialog
