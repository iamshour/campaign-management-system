//#region Import
import * as z from "zod"

import ChannelSourceRequestSchema from "../../common/schemas/channel-source-request-schema"
//#endregion

const objectTypeSchema = z.object({
	label: z.string().min(1, { message: "Expected a label" }),
	value: z.string().min(1, { message: "Expected a label" }),
})

const channelSourceRequestBasicInfoSchema = ChannelSourceRequestSchema.pick({ sender: true }).extend({
	company: objectTypeSchema,
	email: objectTypeSchema.refine((arg) => !!arg.value, { message: "Required" }),
})

export default channelSourceRequestBasicInfoSchema
