//#region Import
import type { SmsListingStatus } from "@/features/channels/common/types"

import smsListingStatusesColorsMap from "@/features/channels/common/constants/sms-listing-statuses-colors-map"
import smsListingStatusesLocaleMap from "@/features/channels/common/constants/sms-listing-statuses-locale-map"
import { useTranslation } from "react-i18next"
//#endregion

const AdminSmsListingsViewStatusTableCell = ({ status }: { status: SmsListingStatus }) => {
	const { t } = useTranslation("channels-common")

	return (
		<span style={{ color: smsListingStatusesColorsMap[status] || "#EDF3F7" }}>
			{t(smsListingStatusesLocaleMap[status])}
		</span>
	)
}

export default AdminSmsListingsViewStatusTableCell
