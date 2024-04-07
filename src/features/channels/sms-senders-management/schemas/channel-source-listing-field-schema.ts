//#region Import
import ChannelSourceRequestSchema from "@/features/channels/common/schemas/channel-source-request-schema"
//#endregion

const ChannelSourceListingFieldSchema = ChannelSourceRequestSchema.pick({ country: true, sampleContent: true })

export default ChannelSourceListingFieldSchema
