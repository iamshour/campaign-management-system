import { string } from "zod"

const TagSchema = string().max(100, { message: "Maximum 100 characters allowed" })

export default TagSchema
