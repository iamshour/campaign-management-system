//#region Import
import type { SmsSenderRequestDetailsType } from "@/features/channels/sms-senders-management/types"

import SmsListingRequestApproveDialog from "@/features/channels/sms-senders-management/dialogs/sms-listing-request-approve-dialog/sms-listing-request-approve-dialog"
import SmsListingRequestRejectDialog from "@/features/channels/sms-senders-management/dialogs/sms-listing-request-reject-dialog/sms-listing-request-reject-dialog"
import LetsIconsCancel from "~icons/lets-icons/cancel"
import MaterialSymbolsCheckSmall from "~icons/material-symbols/check-small"
import MaterialSymbolsCloseRounded from "~icons/material-symbols/close-rounded"
//#endregion

const SmsListingRequestsPendingActions = (
	props: Pick<SmsSenderRequestDetailsType, "country" | "requestId" | "sourceName">
) => {
	return (
		<div className='flex items-center gap-2'>
			<SmsListingRequestApproveDialog requestId={props?.requestId}>
				<MaterialSymbolsCheckSmall />
			</SmsListingRequestApproveDialog>

			<SmsListingRequestRejectDialog {...props}>
				<MaterialSymbolsCloseRounded />
			</SmsListingRequestRejectDialog>

			<SmsListingRequestRejectDialog {...props} withBlock>
				<LetsIconsCancel />
			</SmsListingRequestRejectDialog>
		</div>
	)
}

export default SmsListingRequestsPendingActions
