//#region Import
import * as z from "zod"

import { REGEX_ALPHANUMERIC } from "@/core/constants/regex"

import { IndustryIconEnum } from "../constants/industries-icons-map"
//#endregion

const IndustrySchema = z.object({
	name: z
		.string()
		.min(1, { message: "Required" })
		.min(4, { message: "Minimum 4 characters required" })
		.max(50, { message: "Maximum 50 characters allowed" })
		.refine((val) => REGEX_ALPHANUMERIC.test(val), { message: "Name should be alphanumeric" }),
	description: z
		.string()
		.min(1, { message: "Required" })
		.max(50, { message: "Maximum 100 characters allowed" })
		.refine((val) => REGEX_ALPHANUMERIC.test(val), { message: "Description should be alphanumeric" }),
	icon: z.nativeEnum(IndustryIconEnum, { errorMap: () => ({ message: "Icon Required" }) }),
	color: z.string(),
})

export default IndustrySchema

export type IndustrySchemaType = z.infer<typeof IndustrySchema>
