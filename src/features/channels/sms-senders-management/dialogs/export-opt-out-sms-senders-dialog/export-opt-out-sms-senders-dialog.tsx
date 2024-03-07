//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ExportOptOutSmsSendersDialogContent = lazy(() => import("./export-opt-out-sms-senders-dialog-content"))
//#endregion

interface ExportOptOutSmsSendersDialogProps {
	/**
	 * Trigger Button/Element for triggering Contact Dilaog
	 */
	children: React.ReactNode
}

const ExportOptOutSmsSendersDialog = ({ children }: ExportOptOutSmsSendersDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.exportOptOutSmsSenders" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[241px] w-[382px] sm:h-[249px] sm:w-[390px]' title={t("title")}>
				<ExportOptOutSmsSendersDialogContent onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ExportOptOutSmsSendersDialog
