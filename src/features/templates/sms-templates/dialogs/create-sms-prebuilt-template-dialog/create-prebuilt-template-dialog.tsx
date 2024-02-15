//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

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
	const navigate = useNavigate()

	return (
		<Dialog>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content title='Prebuilt Templates' className='h-[817px] w-[1600px] gap-0 !px-0 !pb-0'>
				<SmsPrebuiltTemplatesRoute />
				<Button className='absolute end-4 top-16' onClick={() => navigate("new-template")} size='sm'>
					+ Create From Scratch
				</Button>
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateSmsPrebuiltTemplateDialog
