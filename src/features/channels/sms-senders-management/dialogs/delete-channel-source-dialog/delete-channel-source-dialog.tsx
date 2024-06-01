//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const DeleteChannelSourceDialogContent = lazy(() => import("./delete-channel-source-dialog-content"))
//#endregion

interface DeleteChannelSourceDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof DeleteChannelSourceDialogContent>, "id"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const DeleteChannelSourceDialog = ({ children, id }: DeleteChannelSourceDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.deleteChannelSource" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[201px] w-[390px] sm:h-[185px]' title={t("title")}>
				<DeleteChannelSourceDialogContent closeDialog={() => setOpen(false)} id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteChannelSourceDialog
