//#region Import
import type { ChannelSourceRequest } from "@/features/channels/sms-senders-management/types/data.types"

import ChannelSourceRequestApproveDialog from "@/features/channels/sms-senders-management/dialogs/channel-source-request-approve-dialog/channel-source-request-approve-dialog"
import ChannelSourceRequestRejectDialog from "@/features/channels/sms-senders-management/dialogs/channel-source-request-reject-dialog/channel-source-request-reject-dialog"
import LetsIconsCancel from "~icons/lets-icons/cancel"
import MaterialSymbolsCheckSmall from "~icons/material-symbols/check-small"
import MaterialSymbolsCloseRounded from "~icons/material-symbols/close-rounded"
//#endregion

const SmsListingRequestsPendingActions = (
	props: Pick<ChannelSourceRequest, "channelSourceName" | "channelSourceRequestId" | "country">
) => {
	return (
		<div className='flex items-center gap-2'>
			<ChannelSourceRequestApproveDialog channelSourceRequestId={props?.channelSourceRequestId}>
				<MaterialSymbolsCheckSmall />
			</ChannelSourceRequestApproveDialog>

			<ChannelSourceRequestRejectDialog {...props} action='REJECT'>
				<MaterialSymbolsCloseRounded />
			</ChannelSourceRequestRejectDialog>

			<ChannelSourceRequestRejectDialog {...props} action='BLOCK'>
				<LetsIconsCancel />
			</ChannelSourceRequestRejectDialog>
		</div>
	)
}

export default SmsListingRequestsPendingActions
