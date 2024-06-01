//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ExportFieldsDialogContent = lazy(() => import("./export-fields-dialog-content"))
//#endregion

interface ExportFieldsDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof ExportFieldsDialogContent>, "exportsType" | "segmentId"> {
	/**
	 * Trigger Button/Element for triggering Contact Dilaog
	 */
	children: React.ReactNode
}

const ExportFieldsDialog = ({ children, exportsType, segmentId }: ExportFieldsDialogProps) => {
	const { t } = useTranslation("exports", { keyPrefix: "dialogs.exportFields" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[589px] w-[382px] sm:h-[597px] sm:w-[390px]' title={t("title")}>
				<ExportFieldsDialogContent
					exportsType={exportsType}
					onDialogClose={() => setOpen(false)}
					segmentId={segmentId}
				/>
			</Dialog.Content>
		</Dialog>
	)
}

export default ExportFieldsDialog
