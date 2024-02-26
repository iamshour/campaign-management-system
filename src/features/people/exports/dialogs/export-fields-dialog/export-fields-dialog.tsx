//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ExportFieldsDialogContent = lazy(() => import("./export-fields-dialog-content"))
//#endregion

interface ExportFieldsDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof ExportFieldsDialogContent>, "exportsType"> {
	/**
	 * Trigger Button/Element for triggering Contact Dilaog
	 */
	children: React.ReactNode
}

const ExportFieldsDialog = ({ children, exportsType }: ExportFieldsDialogProps) => {
	const { t } = useTranslation("exports", { keyPrefix: "dialogs.exportFields" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[507px] w-[382px] sm:h-[515px] sm:w-[390px]' title={t("title")}>
				<ExportFieldsDialogContent exportsType={exportsType} onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ExportFieldsDialog
