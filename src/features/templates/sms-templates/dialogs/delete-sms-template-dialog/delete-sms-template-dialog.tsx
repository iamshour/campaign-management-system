//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"

const DeleteSmsTemplateDialogContent = lazy(() => import("./delete-sms-template-dialog-content"))
//#endregion

/**
 * This dialog component will be used from 2 places:
 * 1- SMS templates table > row actions > delete (in this case "ids" will contain one template ID only)
 * 2- SMS templates table > select rows > delete selected (in this case "ids" will contain several templates IDs)
 */

interface DeleteSmsTemplateDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof DeleteSmsTemplateDialogContent>, "ids"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const DeleteSmsTemplateDialog = ({ children, ids }: DeleteSmsTemplateDialogProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content
				className={ids?.length == 1 ? "h-[201px] w-[390px] sm:h-[185px]" : "w-[390px] xs:h-[295px] sm:h-[303px] "}
				title='Delete Template'>
				<DeleteSmsTemplateDialogContent closeDialog={() => setOpen(false)} ids={ids} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteSmsTemplateDialog
