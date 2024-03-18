//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ChannelSourceListingBlockDialogContent = lazy(() => import("./channel-source-listing-block-dialog-content"))
//#endregion

interface ChannelSourceListingBlockDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof ChannelSourceListingBlockDialogContent>, "closeDialog"> {
	children: React.ReactNode
}

const ChannelSourceListingBlockDialog = ({ children, ...props }: ChannelSourceListingBlockDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.channelSourceListingBlock" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[451px] w-[416px] sm:h-[459px]' title={t("title")}>
				<ChannelSourceListingBlockDialogContent closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ChannelSourceListingBlockDialog
