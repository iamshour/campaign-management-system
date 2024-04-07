//#region Import
import type { ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"

import smsListingStatusesColorsMap from "@/features/channels/common/constants/sms-listing-statuses-colors-map"
import smsListingStatusesLocaleMap from "@/features/channels/common/constants/sms-listing-statuses-locale-map"
import { useTranslation } from "react-i18next"
//#endregion

const AdminListingsViewStatusTableCell = ({ status }: { status: ChannelSourceListingStatus }) => {
	const { t } = useTranslation("channels-common")

	return (
		<span style={{ color: smsListingStatusesColorsMap[status] || "#EDF3F7" }}>
			{t(smsListingStatusesLocaleMap[status])}
		</span>
	)
}

export default AdminListingsViewStatusTableCell
