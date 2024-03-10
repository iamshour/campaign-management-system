//#region Import
import { useUpdateSmsSourceRequestMutation } from "@/features/channels/sms-senders-management/api"
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

export interface SmsListingRequestApproveDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Listing request Id
	 */
	requestId: string
}

const SmsListingRequestApproveDialogContent = ({
	closeDialog,
	requestId,
}: SmsListingRequestApproveDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.listingRequestApprove" })

	const [triggerUpdateSmsListing, { isLoading }] = useUpdateSmsSourceRequestMutation()

	const handleSubmit = async () => {
		await triggerUpdateSmsListing({ requestAction: "APPROVE", requestId }).unwrap()

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

export default SmsListingRequestApproveDialogContent
