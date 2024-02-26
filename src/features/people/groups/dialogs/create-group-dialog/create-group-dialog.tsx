//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const CreateGroupContent = lazy(() => import("./create-group-content"))
//#endregion

interface CreateGroupDialogProps {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const CreateGroupDialog = ({ children }: CreateGroupDialogProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "dialogs.create-group.title" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[321px] w-[382px] sm:h-[329px] sm:w-[390px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t("new-group")}>
				<CreateGroupContent closeDialog={() => setOpen(false)} size='lg' />
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateGroupDialog
