//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const SmsSenderRequestDialogContent = lazy(() => import("./sms-sender-request-dialog-content"))
//#endregion

interface SmsSenderRequestDialogProps {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode

	/**
	 * Callback function used to close the outer dialog
	 */
	closeActivateSmsDialog?: () => void
}

const SmsSenderRequestDialog = ({ children, closeActivateSmsDialog }: SmsSenderRequestDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.smsSenderRequest" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[712px] w-[382px] sm:h-[516px] sm:w-[746px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t("title")}>
				<SmsSenderRequestDialogContent
					closeDialog={() => {
						closeActivateSmsDialog && closeActivateSmsDialog()
						setOpen(false)
					}}
				/>
			</Dialog.Content>
		</Dialog>
	)
}

export default SmsSenderRequestDialog
