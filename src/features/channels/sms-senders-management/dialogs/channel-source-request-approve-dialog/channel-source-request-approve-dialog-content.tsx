//#region Import
import { useUpdateChannelSourceRequestActionMutation } from "@/features/channels/sms-senders-management/api"
import { Button } from "@/ui"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface ChannelSourceRequestApproveDialogContentProps {
	/**
	 * Channel Source request Id
	 */
	channelSourceRequestId: string

	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const ChannelSourceRequestApproveDialogContent = ({
	channelSourceRequestId,
	closeDialog,
}: ChannelSourceRequestApproveDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.channelSourceRequestApprove" })

	const [triggerUpdateChannelSourceRequestAction, { isLoading }] = useUpdateChannelSourceRequestActionMutation()

	const handleSubmit = async () => {
		await triggerUpdateChannelSourceRequestAction({ action: "APPROVE", channelSourceRequestId }).unwrap()

		toast.success(t("successToast"))

		closeDialog()
	}

	return (
		<div className='flex flex-col gap-8 p-2'>
			<p>{t("message")}</p>

			<Button className='ms-auto w-max px-10' loading={isLoading} onClick={handleSubmit}>
				{t("submit")}
			</Button>
		</div>
	)
}

export default ChannelSourceRequestApproveDialogContent
