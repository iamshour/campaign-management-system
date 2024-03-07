//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const SmsListingSuspendDialogContent = lazy(() => import("./sms-listing-suspend-dialog-content"))
//#endregion

interface SmsListingSuspendDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof SmsListingSuspendDialogContent>, "closeDialog"> {
	children: React.ReactNode
}

const SmsListingSuspendDialog = ({ children, ...props }: SmsListingSuspendDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsListingSuspend" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[401px] w-[416px] sm:h-[409px]' title={t("title")}>
				<SmsListingSuspendDialogContent closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default SmsListingSuspendDialog
