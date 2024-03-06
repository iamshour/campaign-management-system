//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const BlockSmsListingDialogContent = lazy(() => import("./block-sms-listing-dialog-content"))
//#endregion

interface BlockSmsListingDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof BlockSmsListingDialogContent>, "closeDialog"> {
	children: React.ReactNode
}

const BlockSmsListingDialog = ({ children, ...props }: BlockSmsListingDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.blockSmsListing" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[449px] w-[416px] sm:h-[457px]' title={t("title")}>
				<BlockSmsListingDialogContent closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default BlockSmsListingDialog
