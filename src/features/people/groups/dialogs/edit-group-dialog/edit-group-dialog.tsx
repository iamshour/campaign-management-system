//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const EditGroupContent = lazy(() => import("./edit-group-content"))
//#endregion

interface EditGroupDialogProps extends Omit<React.ComponentPropsWithoutRef<typeof EditGroupContent>, "closeDialog"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const EditGroupDialog = ({ children, ...props }: EditGroupDialogProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "dialogs.create-group.title" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[321px] w-[382px] sm:h-[329px] sm:w-[390px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t("edit-group")}>
				<EditGroupContent {...props} closeDialog={() => setOpen(false)} size='lg' />
			</Dialog.Content>
		</Dialog>
	)
}

export default EditGroupDialog
