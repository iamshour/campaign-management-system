//#region Import
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

import { Dialog } from "@/ui"

const DeleteGroupDialogContent = lazy(() => import("./delete-group-dialog-content"))
//#endregion

interface DeleteGroupDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof DeleteGroupDialogContent>, "groupId" | "closeActionsDropDown"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const DeleteGroupDialog = ({ children, groupId, ...props }: DeleteGroupDialogProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "dialogs.delete-group" })
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content title={t("title")} className='h-[297px] w-[410px] sm:h-[233px]'>
				<DeleteGroupDialogContent groupId={groupId} closeDeleteGroupDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteGroupDialog
