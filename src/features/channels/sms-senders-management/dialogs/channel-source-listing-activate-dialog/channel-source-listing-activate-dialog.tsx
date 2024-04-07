//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ChannelSourceListingActivateDialogContent = lazy(() => import("./channel-source-listing-activate-dialog-content"))
//#endregion

interface ChannelSourceListingActivateDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof ChannelSourceListingActivateDialogContent>, "closeDialog"> {
	children: React.ReactNode
}

const ChannelSourceListingActivateDialog = ({ children, ...props }: ChannelSourceListingActivateDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.channelSourceListingActivate" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[269px] w-[416px]  sm:h-[257px]' title={t("title")}>
				<ChannelSourceListingActivateDialogContent closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ChannelSourceListingActivateDialog
