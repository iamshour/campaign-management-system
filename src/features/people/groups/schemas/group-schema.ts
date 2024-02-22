import * as z from "zod"

import { REGEX_NAME_FIELDS } from "@/core/constants/regex"

const GroupSchema = z.object({
	groupName: z
		.string()
		.min(1, { message: "Required" })
		.max(50, { message: "Maximum 50 characters allowed" })
		.refine((val) => REGEX_NAME_FIELDS.test(val), {
			message: "Name can include letters, numbers and characters #@_`/&~",
		}),
	groupDescription: z.string().max(100, { message: "Maximum 100 characters allowed" }).optional(),
})

export default GroupSchema

export type GroupSchemaType = z.infer<typeof GroupSchema>
