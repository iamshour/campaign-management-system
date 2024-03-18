//#region Import
import { Dialog, Tooltip } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ChannelSourceRequestApproveDialogContent = lazy(() => import("./channel-source-request-approve-dialog-content"))
//#endregion

interface ChannelSourceRequestApproveDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof ChannelSourceRequestApproveDialogContent>, "closeDialog"> {
	children: React.ReactNode
}

const ChannelSourceRequestApproveDialog = ({ children, ...props }: ChannelSourceRequestApproveDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.channelSourceRequestApprove" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Tooltip align='center' content={t("tooltip")} side='top' sideOffset={8}>
				<Dialog.Trigger className='h-max w-max rounded-md p-1.5 text-base text-[#939393] transition-basic hover:bg-primary-50/75 hover:text-[#2DAEF5]'>
					{children}
				</Dialog.Trigger>
			</Tooltip>

			<Dialog.Content className='h-[233px] w-[390px] sm:h-[241px]' title={t("title")}>
				<ChannelSourceRequestApproveDialogContent {...props} closeDialog={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ChannelSourceRequestApproveDialog
