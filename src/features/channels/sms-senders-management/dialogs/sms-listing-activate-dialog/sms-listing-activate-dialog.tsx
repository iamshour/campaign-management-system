//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const SmsListingActivateDialogContent = lazy(() => import("./sms-listing-activate-dialog-content"))
//#endregion

interface SmsListingActivateDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof SmsListingActivateDialogContent>, "closeDialog"> {
	children: React.ReactNode
}

const SmsListingActivateDialog = ({ children, ...props }: SmsListingActivateDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsListingActivate" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[269px] w-[416px]  sm:h-[257px]' title={t("title")}>
				<SmsListingActivateDialogContent closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default SmsListingActivateDialog
