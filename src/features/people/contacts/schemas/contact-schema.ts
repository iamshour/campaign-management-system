//#region Import
import { isPossiblePhoneNumber } from "react-phone-number-input"
import * as z from "zod"

import { REGEX_EMAIL, REGEX_NO_SPECIAL_CHARACTERS, REGEX_ONE_WORD } from "@/core/constants/regex"
import GroupOptionTypeSchema from "@/features/people/groups/schemas/group-option-type-schema"

import TagSchema from "./tag-schema"
//#endregion

const ContactSchema = z.object({
	firstName: z
		.string()
		.max(50, { message: "Maximum 50 characters allowed" })
		.refine((val) => REGEX_ONE_WORD.test(val), { message: "Only one word is allowed" })
		.refine((val) => REGEX_NO_SPECIAL_CHARACTERS.test(val), { message: "Special Characters are not allowed" })
		.optional(),
	lastName: z
		.string()
		.max(50, { message: "Maximum 50 characters allowed" })
		.refine((val) => REGEX_ONE_WORD.test(val), { message: "Only one word is allowed" })
		.refine((val) => REGEX_NO_SPECIAL_CHARACTERS.test(val), { message: "Special Characters are not allowed" })
		.optional(),
	email: z
		.string()
		.refine((v) => !v?.length || REGEX_EMAIL.test(v), {
			message: "Invalid email address",
		})
		.optional(),
	phoneNumber: z
		.string()
		.refine((val) => !val?.length || isPossiblePhoneNumber(val), {
			message: "Invalid Phone Number",
		})
		.optional(),
	groups: z.array(GroupOptionTypeSchema).optional(),
	tags: z.array(TagSchema).optional(),
	note: z.string().max(500, { message: "Maximum 500 Characters allowed" }).optional(),
})

export default ContactSchema

export type ContactSchemaType = z.infer<typeof ContactSchema>
