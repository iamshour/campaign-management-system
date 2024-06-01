//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const ChannelSourceRequestDetailsDialogContent = lazy(() => import("./channel-source-request-details-dialog-content"))
//#endregion

interface ChannelSourceRequestDetailsDialogProps
	extends React.ComponentPropsWithoutRef<typeof Dialog>,
		React.ComponentPropsWithoutRef<typeof ChannelSourceRequestDetailsDialogContent> {}

const ChannelSourceRequestDetailsDialog = ({ children, ids, ...props }: ChannelSourceRequestDetailsDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.channelSourceRequestDetails" })

	return (
		<Dialog {...props}>
			{!!children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}
			<Dialog.Content className=' h-[750px] w-[382px] sm:h-[754.19px] sm:w-[762px]' title={t("title")}>
				<ChannelSourceRequestDetailsDialogContent ids={ids} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ChannelSourceRequestDetailsDialog
