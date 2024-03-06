//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const DeactivateSmsListingDialogContent = lazy(() => import("./deactivate-sms-listing-dialog-content"))
//#endregion

interface DeactivateSmsListingDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof DeactivateSmsListingDialogContent>, "listingId"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}
const DeactivateSmsListingDialog = ({ children, ...props }: DeactivateSmsListingDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.deactivateListingDialog" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content className='w-[439px]' title={t("title")}>
				<DeactivateSmsListingDialogContent closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeactivateSmsListingDialog
