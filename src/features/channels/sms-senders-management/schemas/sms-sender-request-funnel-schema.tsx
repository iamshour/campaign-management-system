//#region Import
// import type { Country } from "react-phone-number-input"
// import * as z from "zod"
//#endregion

// export type CountriesGroupEntry = { content?: string; country?: Country }

// type SenderRequest = { countriesGroup: CountriesGroupEntry[]; type?: TemplateType }

// const countriesGroupSchema = z
// 	.array(
// 		z.object({
//             country: z.custom<Country>((val) => !!val, "Required"),
//             content: z.string().max(500)
// 		})
// 	)
// 	.max(20)

// const SmsSenderRequestFunnelSchema = z.object({
// 	// List of conditions, each containing a list of rules
// 	conditions: z
//     .array(
//         z.object({
//             conditionId: z.string().uuid(),
//             rules: rulesSchema,
//         })
//     )
//     .max(10),
// })

// export default SmsSenderRequestFunnelSchema

// export type ContactSchemaType = z.infer<typeof SmsSenderRequestFunnelSchema>
