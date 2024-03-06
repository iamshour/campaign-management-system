//#region Import
import type { TemplateType } from "@/features/templates/common/types"
import type { Country } from "react-phone-number-input"

import { REGEX_ALPHANUMERICAL } from "@/core/constants/regex"
import * as z from "zod"
//#endregion

const SmsSenderRequestSchema = z.object({
	note: z.string().max(500, { message: "Maximum 500 Characters allowed" }).optional(),
	sampleContent: z.string().min(1, { message: "Required" }).max(500, { message: "Maximum 500 Characters allowed" }),
	sender: z
		.string()
		.min(1, { message: "Required" })
		.min(3, { message: "Minimum 3 characters required" })
		.max(50, { message: "Maximum 50 characters allowed" })
		.refine((val) => REGEX_ALPHANUMERICAL.test(val), {
			message: "Name can include letters, numbers and spaces",
		}),
	targetCountry: z.custom<Country>((val) => !!val, "Required"),
	type: z.custom<TemplateType>((val) => !!val, "Required"),
})

export default SmsSenderRequestSchema

export type SmsSenderRequestSchemaType = z.infer<typeof SmsSenderRequestSchema>
