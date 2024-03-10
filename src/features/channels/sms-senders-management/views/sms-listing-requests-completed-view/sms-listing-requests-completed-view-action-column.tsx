//#region Import
import type { ChannelSourceRequestAction } from "@/features/channels/common/types/data.types"

import smsListingRequestActionsColorsMap from "@/features/channels/common/constants/sms-listing-request-actions-colors-map"
import smsListingRequestActionsLocalMap from "@/features/channels/common/constants/sms-listing-request-actions-local-map"
import { useTranslation } from "react-i18next"
//#endregion

const SmsListingRequestsCompletedViewActionColumn = ({ action }: { action: ChannelSourceRequestAction }) => {
	const { t } = useTranslation("senders-management")

	return (
		<span style={{ color: smsListingRequestActionsColorsMap[action] }}>
			{t(smsListingRequestActionsLocalMap[action])}
		</span>
	)
}

export default SmsListingRequestsCompletedViewActionColumn
