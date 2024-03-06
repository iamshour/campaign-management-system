//#region Import
import { useUpdateSmsListingStatusMutation } from "@/features/channels/sms-senders-management/api"
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

export interface ListingRequestApproveDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Listing request Id
	 */
	id: string
}

const ListingRequestApproveDialogContent = ({ closeDialog, id }: ListingRequestApproveDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.listingRequestApprove" })

	const [triggerUpdateSmsListing, { isLoading }] = useUpdateSmsListingStatusMutation()

	const handleSubmit = async () => {
		await triggerUpdateSmsListing({ requestAction: "APPROVED", requestId: id }).unwrap()

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

export default ListingRequestApproveDialogContent
