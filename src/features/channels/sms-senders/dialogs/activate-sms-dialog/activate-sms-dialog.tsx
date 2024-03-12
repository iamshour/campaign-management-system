//#region Import
import { ChannelOrigin } from "@/core/utils/get-channel-type"
import ChannelSourceRequestDialog from "@/features/channels/sms-senders/dialogs/channel-source-request-dialog/channel-source-request-dialog"
import { Button, Dialog } from "@/ui"
import { useState } from "react"
import { useTranslation } from "react-i18next"
//#endregion

interface ActivateSmsDialogProps {
	/**
	 * Type of channel (local/international), used to display dialog title
	 */
	channelOrigin: ChannelOrigin

	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const ActivateSmsDialog = ({ channelOrigin, children }: ActivateSmsDialogProps) => {
	const { t } = useTranslation("sms-senders")

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[] w-[438px] sm:h-[] sm:w-[438px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t(`dialogs.activateSmsDialog.title.${channelOrigin}`)}>
				<div className='p-2'>
					<p>{t("dialogs.activateSmsDialog.text")}</p>

					<ChannelSourceRequestDialog closeActivateSmsDialog={() => setOpen(false)} formType='newRequest'>
						<Button className='ms-auto mt-8 block' type='button'>
							{t("dialogs.activateSmsDialog.buttons.confirm")}
						</Button>
					</ChannelSourceRequestDialog>
				</div>
			</Dialog.Content>
		</Dialog>
	)
}

export default ActivateSmsDialog
