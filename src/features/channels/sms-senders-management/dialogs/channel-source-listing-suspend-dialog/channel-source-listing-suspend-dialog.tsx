//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ChannelSourceListingSuspendDialogContent = lazy(() => import("./channel-source-listing-suspend-dialog-content"))
//#endregion

interface ChannelSourceListingSuspendDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof ChannelSourceListingSuspendDialogContent>, "closeDialog"> {
	children: React.ReactNode
}

const ChannelSourceListingSuspendDialog = ({ children, ...props }: ChannelSourceListingSuspendDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.channelSourceListingSuspend" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[433px] w-[416px] xs:h-[425px] sm:h-[433px]' title={t("title")}>
				<ChannelSourceListingSuspendDialogContent closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ChannelSourceListingSuspendDialog
