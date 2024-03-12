//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const DeactivateListingDialogContent = lazy(() => import("./deactivate-listing-dialog-content"))
//#endregion

interface DeactivateListingDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof DeactivateListingDialogContent>, "id"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}
const DeactivateListingDialog = ({ children, ...props }: DeactivateListingDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.deactivateListingDialog" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content className='h-[290px] w-[439px]' title={t("title")}>
				<DeactivateListingDialogContent closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeactivateListingDialog
