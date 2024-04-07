//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const DeleteExportsDialogContent = lazy(() => import("./delete-exports-dialog-content"))
//#endregion

interface DeleteExportsDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof DeleteExportsDialogContent>, "id"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const DeleteExportsDialog = ({ children, id, ...props }: DeleteExportsDialogProps) => {
	const { t } = useTranslation("exports", { keyPrefix: "dialogs.deleteExports" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[201px] w-[319.5px] sm:h-[209px] sm:w-[350px]' title={t("title")}>
				<DeleteExportsDialogContent closeDialog={() => setOpen(false)} id={id} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteExportsDialog
