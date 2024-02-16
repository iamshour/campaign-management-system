//#region Import
import * as z from "zod"

import SmsTemplateSchema from "@/features/templates/sms-templates/schemas/sms-template-schema"
//#endregion

const SmsIndustryTemplateSchema = SmsTemplateSchema.extend({
	mostPopular: z.boolean().optional().default(false),
	background: z.instanceof(File).optional(),
	backgroundUrl: z.string().optional(),
}).refine(({ background, backgroundUrl }) => !!background || !!backgroundUrl, {
	message: "Required",
	path: ["background"],
})

export default SmsIndustryTemplateSchema

export type SmsIndustryTemplateSchemaType = z.infer<typeof SmsIndustryTemplateSchema>
