//#region Import
import ChannelSourceRequestSchema from "@/features/channels/common/schemas/channel-source-request-schema"
import * as z from "zod"
//#endregion

const objectTypeSchema = z.object({
	label: z.string().min(1, { message: "Expected a label" }),
	value: z.string().min(1, { message: "Expected a label" }),
})

const channelSourceRequestBasicInfo = ChannelSourceRequestSchema.pick({ sender: true }).extend({
	company: objectTypeSchema,
	email: objectTypeSchema,
})

const listingField = ChannelSourceRequestSchema.pick({ country: true, sampleContent: true })

const bulkListingsGroup = ChannelSourceRequestSchema.pick({ templateType: true }).extend({
	listingsFields: z.array(listingField),
})

// TODO: Refine on Total Length of requests --> 20 requests max
const ChannelSourceRequestBulkSchema = z.object({
	basicInfo: channelSourceRequestBasicInfo,
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

export default ChannelSourceRequestBulkSchema

export type ChannelSourceRequestBulkSchemaType = z.infer<typeof ChannelSourceRequestBulkSchema>
