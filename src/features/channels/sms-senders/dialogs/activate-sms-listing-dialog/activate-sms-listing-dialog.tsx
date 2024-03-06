//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ActivateSmsListingDialogContent = lazy(() => import("./activate-sms-listing-dialog-content"))
//#endregion

interface ActivateSmsListingDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof ActivateSmsListingDialogContent>, "listingId"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}
const ActivateSmsListingDialog = ({ children, ...props }: ActivateSmsListingDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.activateListingDialog" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content className='w-[439px]' title={t("title")}>
				<ActivateSmsListingDialogContent closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ActivateSmsListingDialog
