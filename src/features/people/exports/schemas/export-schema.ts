//#region Import
import { REGEX_FILENAME } from "@/core/constants/regex"
import * as z from "zod"

import { ContactExportField } from "../types"
//#endregion

const exportSchema = z.object({
	exportedFields: z.array(z.nativeEnum(ContactExportField)).refine((value) => !!value?.length, {
		message: "Please select at least one field.",
	}),
	fileName: z
		.string()
		.min(1, { message: "A minimum 1 character is required." })
		.max(50, { message: "Maximum 50 characters allowed" })
		.refine((val) => REGEX_FILENAME.test(val), {
			message: 'The following charcters are not allowed: / : * ? " < > |',
		}),
})

export default exportSchema

export type ExportSchemaType = z.infer<typeof exportSchema>
