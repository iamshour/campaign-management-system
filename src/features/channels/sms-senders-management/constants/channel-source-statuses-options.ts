//#region Import

import type { ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"

import smsListingStatusesLocaleMap from "@/features/channels/common/constants/sms-listing-statuses-locale-map"
//#endregion

const channelSourceStatusesOptions = (
	Object.entries(smsListingStatusesLocaleMap) as [ChannelSourceListingStatus, string][]
)?.map(([value, label]) => ({
	label,
	value,
}))

export default channelSourceStatusesOptions
