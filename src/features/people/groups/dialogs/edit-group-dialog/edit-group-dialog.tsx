//#region Import
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

import { Dialog } from "@/ui"

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
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				title={t("edit-group")}
				className='h-[321px] w-[382px] sm:h-[329px] sm:w-[390px]'
				onInteractOutside={(e) => e.preventDefault()}>
				<EditGroupContent {...props} closeDialog={() => setOpen(false)} size='lg' />
			</Dialog.Content>
		</Dialog>
	)
}

export default EditGroupDialog
