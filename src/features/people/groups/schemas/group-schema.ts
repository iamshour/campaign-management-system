import * as z from "zod"

const GroupSchema = z.object({
	groupName: z
		.string()
		.min(1, { message: "Min 1 character expected" })
		.max(50, { message: "Maximum 50 characters allowed" }),
	groupDescription: z.string().max(100, { message: "Maximum 100 characters allowed" }).optional(),
})

export default GroupSchema

export type GroupSchemaType = z.infer<typeof GroupSchema>
