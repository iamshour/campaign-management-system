//#region Import
import type { ChannelSource } from "@/features/channels/common/types/data.types"
//#endregion

const channelSourceFieldsLocaleMap: Partial<Record<keyof ChannelSource, string>> = {
	channelSourceName: "channels-common:fields.sender",
	createdAt: "channels-common:fields.createdAt",
	templateTypes: "channels-common:fields.type",
}

export default channelSourceFieldsLocaleMap
