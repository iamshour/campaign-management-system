//#region Import
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

import { Dialog } from "@/ui"

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
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				title={t("new-group")}
				className='h-[321px] w-[382px] sm:h-[329px] sm:w-[390px]'
				onInteractOutside={(e) => e.preventDefault()}>
				<CreateGroupContent closeDialog={() => setOpen(false)} size='lg' />
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateGroupDialog
