//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const DeleteGroupDialogContent = lazy(() => import("./delete-group-dialog-content"))
//#endregion

interface DeleteGroupDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof DeleteGroupDialogContent>, "groupId"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const DeleteGroupDialog = ({ children, groupId, ...props }: DeleteGroupDialogProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "dialogs.delete-group" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[297px] w-[410px] sm:h-[233px]' title={t("title")}>
				<DeleteGroupDialogContent closeDialog={() => setOpen(false)} groupId={groupId} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteGroupDialog
