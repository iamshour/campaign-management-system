//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ActivateListingDialogContent = lazy(() => import("./activate-listing-dialog-content"))
//#endregion

interface ActivateListingDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof ActivateListingDialogContent>, "id"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}
const ActivateListingDialog = ({ children, ...props }: ActivateListingDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.activateListingDialog" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content className='h-[220px] w-[439px]' title={t("title")}>
				<ActivateListingDialogContent closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ActivateListingDialog
