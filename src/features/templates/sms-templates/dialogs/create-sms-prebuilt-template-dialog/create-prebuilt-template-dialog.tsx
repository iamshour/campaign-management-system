//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import { Button, Dialog } from "@/ui"

const SmsPrebuiltTemplatesView = lazy(
	() => import("@/features/templates/sms-templates/views/sms-prebuilt-templates-view/sms-prebuilt-templates-view")
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
				<SmsPrebuiltTemplatesView
					headerChildren={<Button onClick={() => navigate("new-template")}>+ Create From Scratch</Button>}
				/>
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateSmsPrebuiltTemplateDialog
