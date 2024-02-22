//#region Import
import * as z from "zod"

import { REGEX_NAME_FIELDS } from "@/core/constants/regex"

import { IndustryIconEnum } from "../constants/industries-icons-map"
//#endregion

const IndustrySchema = z.object({
	name: z
		.string()
		.min(1, { message: "Required" })
		.min(4, { message: "Minimum 4 characters required" })
		.max(50, { message: "Maximum 50 characters allowed" })
		.refine((val) => REGEX_NAME_FIELDS.test(val), {
			message: "Name can include letters, numbers and characters #@_`/&~",
		}),
	description: z.string().min(1, { message: "Required" }).max(50, { message: "Maximum 100 characters allowed" }),
	icon: z.nativeEnum(IndustryIconEnum, { errorMap: () => ({ message: "Icon Required" }) }),
	color: z.string(),
})

export default IndustrySchema

export type IndustrySchemaType = z.infer<typeof IndustrySchema>
