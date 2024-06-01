//#region Import
import ChannelSourceRequestSchema from "@/features/channels/common/schemas/channel-source-request-schema"
import * as z from "zod"

import channelSourceRequestBasicInfoSchema from "./channel-source-basic-info-schema"
import ChannelSourceListingFieldSchema from "./channel-source-listing-field-schema"
//#endregion

const bulkListingsGroup = ChannelSourceRequestSchema.pick({ templateType: true }).extend({
	listingsFields: z.array(
		ChannelSourceListingFieldSchema.extend({ status: z.custom<"APPROVED" | "BLOCKED">((val) => !!val, "Required") })
	),
})

const ChannelSourceBulkSchema = z.object({
	basicInfo: channelSourceRequestBasicInfoSchema.omit({ email: true }),
	bulkListingsGroups: z
		.array(bulkListingsGroup)
		.max(3, { message: "Can't have more than three types!" })
		.refine(
			(arg) => {
				const totalEntriesLength = arg.reduce((acc, currentVal) => acc + currentVal.listingsFields.length, 0)

				return totalEntriesLength <= 20
			},
			{ message: "Exceeded Maximum number of allowed requests to add: 20" }
		),
})

export default ChannelSourceBulkSchema

export type ChannelSourceBulkSchemaType = z.infer<typeof ChannelSourceBulkSchema>
