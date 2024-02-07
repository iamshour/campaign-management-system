//#region Import
import * as z from "zod"

import { MAX_TOTAL_CHARS, MAX_PLACEHOLDERS, PLACEHOLDER_REGEX } from "../constants/sms-template-body-constants"
import type { SmsTemplateLanguageOption, SmsTemplateTypeOption } from "../types"
import { rearrangePlaceholders } from "../utils/sms-template-body-utils"
//#endregion

const SmsTemplateSchema = z.object({
	name: z.string().max(50, { message: "Maximum 50 characters allowed" }),
	type: z.custom<SmsTemplateTypeOption>((val) => !!val, "Required"),
	language: z.custom<SmsTemplateLanguageOption>((val) => !!val, "Required"),
	body: z
		.string()
		.max(MAX_TOTAL_CHARS, { message: "Maximum 800 Characters allowed" })
		.refine(
			(body) => {
				const placeholdersCount = body?.match(PLACEHOLDER_REGEX)?.length ?? 0
				return !(placeholdersCount > MAX_PLACEHOLDERS)
			},
			{ message: "Maximum 5 placeholders allowed" }
		)
		.transform((body) => {
			return rearrangePlaceholders(body)
		}),
	addUnsubscribeLink: z.boolean().default(false),
})

export default SmsTemplateSchema

export type SmsTemplateSchemaType = z.infer<typeof SmsTemplateSchema>
