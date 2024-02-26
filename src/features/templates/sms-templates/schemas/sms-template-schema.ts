//#region Import
import { REGEX_NAME_FIELDS } from "@/core/constants/regex"
import * as z from "zod"

import type { SmsTemplateLanguageOption, SmsTemplateTypeOption } from "../types"

import { MAX_PLACEHOLDERS } from "../constants/sms-template-body-constants"
import { PLACEHOLDER_REGEX } from "../constants/sms-template-body-regex"
import { getMaxTotalCharacters, getTotalCharactersCount } from "../utils"
//#endregion

const SmsTemplateSchema = z.object({
	body: z
		.string()
		.min(1, { message: "Required" })
		.superRefine((body, ctx) => {
			if (getTotalCharactersCount(body) > getMaxTotalCharacters(body)) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					inclusive: true,
					maximum: getMaxTotalCharacters(body),
					type: "string",
				})

				return z.NEVER
			}
		})
		.refine(
			(body) => {
				const placeholdersCount = body?.match(PLACEHOLDER_REGEX)?.length ?? 0

				return placeholdersCount <= MAX_PLACEHOLDERS
			},
			{ message: `Maximum ${MAX_PLACEHOLDERS} placeholders allowed` }
		),
	language: z.custom<SmsTemplateLanguageOption>((val) => !!val, "Required"),
	name: z
		.string()
		.min(1, { message: "Required" })
		.min(4, { message: "Minimum 4 characters required" })
		.max(50, { message: "Maximum 50 characters allowed" })
		.refine((val) => REGEX_NAME_FIELDS.test(val), {
			message: "Name can include letters, numbers and characters #@_`/&~",
		}),
	type: z.custom<SmsTemplateTypeOption>((val) => !!val, "Required"),
})

export default SmsTemplateSchema

export type SmsTemplateSchemaType = z.infer<typeof SmsTemplateSchema>
