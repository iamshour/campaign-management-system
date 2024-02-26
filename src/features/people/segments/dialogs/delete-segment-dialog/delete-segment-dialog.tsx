//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"
const DeleteSegmentDialogContent = lazy(() => import("./delete-segment-dialog-content"))
//#endregion

interface DeleteSegmentDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof DeleteSegmentDialogContent>, "id"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const DeleteSegmentDialog = ({ children, id }: DeleteSegmentDialogProps) => {
	const { t } = useTranslation("segments", { keyPrefix: "dialogs.delete-segment" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[201px] w-[319.5px] sm:h-[209px] sm:w-[350px]' title={t("title")}>
				<DeleteSegmentDialogContent closeDialog={() => setOpen(false)} id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteSegmentDialog
