//#region Import
import * as z from "zod"

import { IndustryIconEnum } from "../constants/industries-icons-map"
//#endregion

const IndustrySchema = z.object({
	name: z.string().max(50, { message: "Maximum 50 characters allowed" }),
	description: z.string().max(100, { message: "Maximum 100 characters allowed" }),
	icon: z.nativeEnum(IndustryIconEnum, { errorMap: () => ({ message: "Icon Required" }) }),
	color: z.string(),
})

export default IndustrySchema

export type IndustrySchemaType = z.infer<typeof IndustrySchema>
