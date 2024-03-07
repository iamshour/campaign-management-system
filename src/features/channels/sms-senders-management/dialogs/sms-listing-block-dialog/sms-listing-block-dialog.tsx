//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const SmsListingBlockDialogContent = lazy(() => import("./sms-listing-block-dialog-content"))
//#endregion

interface SmsListingBlockDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof SmsListingBlockDialogContent>, "closeDialog"> {
	children: React.ReactNode
}

const SmsListingBlockDialog = ({ children, ...props }: SmsListingBlockDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsListingBlock" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[449px] w-[416px] sm:h-[457px]' title={t("title")}>
				<SmsListingBlockDialogContent closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default SmsListingBlockDialog
