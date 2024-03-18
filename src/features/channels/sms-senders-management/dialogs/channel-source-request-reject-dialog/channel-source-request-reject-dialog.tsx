//#region Import
import { Dialog, Tooltip } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"
const ChannelSourceRequestRejectDialogContent = lazy(() => import("./channel-source-request-reject-dialog-content"))
//#endregion

interface ChannelSourceRequestRejectDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof ChannelSourceRequestRejectDialogContent>, "closeDialog"> {
	children: React.ReactNode
}

const ChannelSourceRequestRejectDialog = ({ action, children, ...props }: ChannelSourceRequestRejectDialogProps) => {
	const { t } = useTranslation("senders-management", {
		keyPrefix: `dialogs.channelSourceRequestRejection.${action}`,
	})

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Tooltip align='center' content={t("tooltip")} side='top' sideOffset={8}>
				<Dialog.Trigger className='h-max w-max rounded-md p-1.5 text-base text-[#939393] transition-basic hover:bg-primary-50/75 hover:text-[#2DAEF5]'>
					{children}
				</Dialog.Trigger>
			</Tooltip>

			<Dialog.Content className='h-[379px] w-[416px] sm:h-[411px]' title={t("title")}>
				<ChannelSourceRequestRejectDialogContent action={action} closeDialog={() => setOpen(false)} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ChannelSourceRequestRejectDialog
