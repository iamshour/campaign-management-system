//#region Import
import type { SmsListingRequest } from "@/features/channels/sms-senders-management/types"

import ListingRequestApproveDialog from "@/features/channels/sms-senders-management/dialogs/listing-request-approve-dialog/listing-request-approve-dialog"
import ListingRequestRejectDialog from "@/features/channels/sms-senders-management/dialogs/listing-request-reject-dialog/listing-request-reject-dialog"
import LetsIconsCancel from "~icons/lets-icons/cancel"
import MaterialSymbolsCheckSmall from "~icons/material-symbols/check-small"
import MaterialSymbolsCloseRounded from "~icons/material-symbols/close-rounded"
//#endregion

const SmsListingRequestsPendingActions = (props: Pick<SmsListingRequest, "country" | "id" | "sender">) => {
	return (
		<div className='flex items-center gap-2'>
			<ListingRequestApproveDialog id={props?.id}>
				<MaterialSymbolsCheckSmall />
			</ListingRequestApproveDialog>

			<ListingRequestRejectDialog {...props}>
				<MaterialSymbolsCloseRounded />
			</ListingRequestRejectDialog>

			<ListingRequestRejectDialog {...props} withBlock>
				<LetsIconsCancel />
			</ListingRequestRejectDialog>
		</div>
	)
}

export default SmsListingRequestsPendingActions
