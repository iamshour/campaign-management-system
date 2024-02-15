//#region Import
import * as z from "zod"

import { MAX_PLACEHOLDERS, PLACEHOLDER_REGEX } from "../constants/sms-template-body-constants"
import type { SmsTemplateLanguageOption, SmsTemplateTypeOption } from "../types"
import { getTotalCharactersCount, getMaxTotalCharacters } from "../utils/sms-template-body-utils"
//#endregion

const SmsTemplateSchema = z.object({
	name: z.string().max(50, { message: "Maximum 50 characters allowed" }),
	type: z.custom<SmsTemplateTypeOption>((val) => !!val, "Required"),
	language: z.custom<SmsTemplateLanguageOption>((val) => !!val, "Required"),
	body: z
		.string()
		.refine(
			(body) => {
				const placeholdersCount = body?.match(PLACEHOLDER_REGEX)?.length ?? 0
				return !(placeholdersCount > MAX_PLACEHOLDERS)
			},
			{ message: "Maximum 5 placeholders allowed" }
		)
		.superRefine((body, ctx) => {
			if (getTotalCharactersCount(body) > getMaxTotalCharacters(body)) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					maximum: getMaxTotalCharacters(body),
					type: "string",
					inclusive: true,
				})

				return z.NEVER
			}
		}),
})

export default SmsTemplateSchema

export type SmsTemplateSchemaType = z.infer<typeof SmsTemplateSchema>
