//#region Import
import { lazy, useState } from "react"

import { Dialog } from "@/ui"

const DeleteIndustryTemplateDialogContent = lazy(() => import("./delete-industry-template-dialog-content"))
//#endregion

/**
 * This dialog component will be used from 2 places:
 * 1- Industry templates table > row actions > delete (in this case "ids" will contain one template ID only)
 * 2- Industry templates table > select rows > delete selected (in this case "ids" will contain several templates IDs)
 */

interface DeleteIndustryTemplateDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof DeleteIndustryTemplateDialogContent>, "ids"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const DeleteIndustryTemplateDialog = ({ children, ids }: DeleteIndustryTemplateDialogProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content
				title='Delete Template'
				className={
					ids?.length == 1
						? "h-[201px] w-[319.5px] sm:h-[209px] sm:w-[350px]"
						: "h-[343px] w-[319.5px]  sm:h-[327px] sm:w-[350px]"
				}>
				<DeleteIndustryTemplateDialogContent ids={ids} onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteIndustryTemplateDialog
