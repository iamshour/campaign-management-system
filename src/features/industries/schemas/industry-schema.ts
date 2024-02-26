//#region Import
import { REGEX_NAME_FIELDS } from "@/core/constants/regex"
import * as z from "zod"

import { IndustryIconEnum } from "../constants/industries-icons-map"
//#endregion

const IndustrySchema = z.object({
	color: z.string(),
	description: z.string().min(1, { message: "Required" }).max(50, { message: "Maximum 100 characters allowed" }),
	icon: z.nativeEnum(IndustryIconEnum, { errorMap: () => ({ message: "Icon Required" }) }),
	name: z
		.string()
		.min(1, { message: "Required" })
		.min(4, { message: "Minimum 4 characters required" })
		.max(50, { message: "Maximum 50 characters allowed" })
		.refine((val) => REGEX_NAME_FIELDS.test(val), {
			message: "Name can include letters, numbers and characters #@_`/&~",
		}),
})

export default IndustrySchema

export type IndustrySchemaType = z.infer<typeof IndustrySchema>
