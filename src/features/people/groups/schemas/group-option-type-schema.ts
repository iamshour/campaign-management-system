import { object, string } from "zod"

const GroupOptionTypeSchema = object({
	label: string().max(100, { message: "Maximum 100 characters allowed" }),
	value: string().uuid(),
})

export default GroupOptionTypeSchema
