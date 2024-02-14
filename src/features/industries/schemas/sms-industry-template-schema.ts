//#region Import
import * as z from "zod"

import SmsTemplateSchema from "@/features/templates/sms-templates/schemas/sms-template-schema"
//#endregion

const SmsIndustryTemplateSchema = SmsTemplateSchema.extend({
	mostPopular: z.boolean(),
	background: z.instanceof(File).optional(),
	backgroundUrl: z.string().optional(),
}).refine(({ background, backgroundUrl }) => !background && !backgroundUrl, { message: "Required!" })

export default SmsIndustryTemplateSchema

export type SmsIndustryTemplateSchemaType = z.infer<typeof SmsIndustryTemplateSchema>
