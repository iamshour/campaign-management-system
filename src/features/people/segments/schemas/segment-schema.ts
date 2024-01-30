import * as z from "zod"

// const rulesSchema = z
// 	.array(
// 		z.object({
// 			attribute: z
// 				.enum(["First name", "Phone number", "Email address", "Country", "Tags", "Groups", "Segments"])
// 				.optional(),
// 			condition: z
// 				.enum(["Is", "Is not", "Starts with", "Ends with", "Contains", "Not contains", "Is empty", "Is not empty"])
// 				.optional(),
// 			specification: z.string().optional(),
// 		})
// 	)
// 	.max(10)

const SegmentSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Segment Name is required" })
		.max(50, { message: "Maximum 50 characters allowed" }),
	description: z.string().max(100, { message: "Maximum 100 characters allowed" }).optional(),
	// List of conditions, each containing a list of rules
	// conditions: z
	// 	.array(
	// 		z.object({
	// 			conditionId: z.string().uuid(),
	// 			rules: rulesSchema,
	// 		})
	// 	)
	// 	.max(10),
})

export default SegmentSchema

export type SegmentSchemaType = z.infer<typeof SegmentSchema>
