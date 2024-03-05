//#region Import
import type { RequestActionType } from "@/features/channels/sms-senders-management/types"

import smsListingRequestActionsLocalMap from "@/features/channels/sms-senders-management/constants/sms-listing-request-actions-local-map"
import { useTranslation } from "react-i18next"
//#endregion

const SmsListingRequestsCompletedViewActionColumn = ({ action }: { action: RequestActionType }) => {
	const { t } = useTranslation("senders-management")

	return <span style={{ color: actionsColorsMap[action] }}>{t(smsListingRequestActionsLocalMap[action])}</span>
}

export default SmsListingRequestsCompletedViewActionColumn

const actionsColorsMap: Record<RequestActionType, string> = {
	APPROVED: "#28B745",
	REJECTED: "#F5788C",
	REJECTED_BLOCKED: "#EB2344",
}
