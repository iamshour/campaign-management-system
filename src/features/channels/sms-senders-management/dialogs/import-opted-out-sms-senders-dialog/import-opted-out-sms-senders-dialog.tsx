//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ImportOptedOutSmsSendersDialogContent = lazy(() => import("./import-opted-out-sms-senders-content-dialog"))
//#endregion

interface ImportOptedOutSmsSendersDialogProps {
	/**
	 * Trigger Button/Element for triggering Contact Dilaog
	 */
	children: React.ReactNode
}

const ImportOptedOutSmsSendersDialog = ({ children }: ImportOptedOutSmsSendersDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.importOptedOutSmsSenders" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[327.8px] w-[481.63px] sm:h-[305.8px]' title={t("title")}>
				<ImportOptedOutSmsSendersDialogContent closeDialog={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ImportOptedOutSmsSendersDialog
