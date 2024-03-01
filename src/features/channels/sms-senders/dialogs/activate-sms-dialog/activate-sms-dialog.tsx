//#region Import
import { Button, Dialog } from "@/ui"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { SmsChannelTypeOption } from "../../types"
import SmsSenderRequestDialog from "../sms-sender-request-dialog/sms-sender-request-dialog"

//#endregion

interface ActivateSmsDialogProps {
	/**
	 * Type of channel (local/international), used to display dialog title
	 */
	channelType: SmsChannelTypeOption

	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const ActivateSmsDialog = ({ channelType, children }: ActivateSmsDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.activateSmsDialog" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[] w-[438px] sm:h-[] sm:w-[438px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t(`title.${channelType}`)}>
				<div className='p-2'>
					<p>{t("text")}</p>

					<SmsSenderRequestDialog closeActivateSmsDialog={() => setOpen(false)}>
						<Button className='ms-auto mt-8 block' type='button'>
							{t("buttons.confirm")}
						</Button>
					</SmsSenderRequestDialog>
				</div>
			</Dialog.Content>
		</Dialog>
	)
}

export default ActivateSmsDialog
