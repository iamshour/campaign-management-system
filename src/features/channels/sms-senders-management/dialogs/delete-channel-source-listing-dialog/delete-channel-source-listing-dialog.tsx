//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const DeleteChannelSourceListingDialogContent = lazy(() => import("./delete-channel-source-listing-dialog-content"))
//#endregion

interface DeleteChannelSourceListingDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof DeleteChannelSourceListingDialogContent>, "closeDialog"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const DeleteChannelSourceListingDialog = ({ children, ...props }: DeleteChannelSourceListingDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.deleteChannelSourceListing" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[225px] w-[390px] xs:h-[201px] sm:h-[209px]' title={t("title")}>
				<DeleteChannelSourceListingDialogContent closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default DeleteChannelSourceListingDialog
