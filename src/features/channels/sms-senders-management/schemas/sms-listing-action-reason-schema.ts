//#region Import
import * as z from "zod"
//#endregion

const SmsListingActionReasonSchema = z.object({
	reason: z
		.string()
		.min(1, { message: "Action reason required" })
		.max(500, { message: "Maximum 500 characters allowed" }),
})

export default SmsListingActionReasonSchema

export type SmsLisintgActionReasonSchemaType = z.infer<typeof SmsListingActionReasonSchema>
