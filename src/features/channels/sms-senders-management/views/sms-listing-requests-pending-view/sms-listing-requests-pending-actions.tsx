//#region Import
import ListingRequestApproveDialog from "@/features/channels/sms-senders-management/dialogs/listing-request-approve-dialog/listing-request-approve-dialog"
import ListingRequestRejectDialog from "@/features/channels/sms-senders-management/dialogs/listing-request-reject-dialog/listing-request-reject-dialog"
import LetsIconsCancel from "~icons/lets-icons/cancel"
import MaterialSymbolsCheckSmall from "~icons/material-symbols/check-small"
import MaterialSymbolsCloseRounded from "~icons/material-symbols/close-rounded"
//#endregion

const SmsListingRequestsPendingActions = ({ id }: { id: string }) => {
	return (
		<div className='flex items-center gap-2'>
			<ListingRequestApproveDialog id={id}>
				<MaterialSymbolsCheckSmall />
			</ListingRequestApproveDialog>

			<ListingRequestRejectDialog id={id}>
				<LetsIconsCancel />
			</ListingRequestRejectDialog>

			<ListingRequestRejectDialog id={id} withBlock>
				<MaterialSymbolsCloseRounded />
			</ListingRequestRejectDialog>
		</div>
	)
}

export default SmsListingRequestsPendingActions
